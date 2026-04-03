import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';
import Order from '../models/orderModel.js';
import Invoice from '../models/invoiceModel.js';
import UsersArchives from '../models/UsersArchivesModel.js';
import { ProductErrorLogger, OrderErrorLogger, UserErrorLogger } from '../middleware/winston.js';

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeProduct = (product) => {
    const images = Array.isArray(product.productImages)
        ? product.productImages
        : Array.isArray(product.images)
            ? product.images
            : product.image
                ? [product.image]
                : [];

    return {
        _id: String(product._id),
        productName: product.productName,
        shortDescription: product.shortDescription || '',
        longDescription: product.longDescription || '',
        price: product.price,
        quantity: product.quantity,
        releaseYear: product.releaseYear,
        category: product.category,
        brand: product.brand,
        company: product.company,
        os: product.os,
        status: product.status,
        images,
        image: images[0] || product.image || '',
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
};

const buildPagination = (query) => {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

const buildPagedResponse = ({ items, total, page, limit }) => ({
    success: true,
    items,
    pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(Math.ceil(total / limit), 1),
        hasNextPage: page * limit < total,
    },
});

export const getAdminOverview = async (req, res, next) => {
    try {
        const [
            totalProducts,
            totalUsers,
            totalOrders,
            totalInvoices,
            activeProducts,
            outOfStockProducts,
            lowStockProducts,
            recentOrders,
            recentUsers,
            statusAggregation,
            revenueAggregation,
            inventoryAggregation,
        ] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments(),
            Order.countDocuments(),
            Invoice.countDocuments(),
            Product.countDocuments({ status: 'active' }),
            Product.countDocuments({
                $or: [{ status: 'out-of-stock' }, { quantity: { $lte: 0 } }],
            }),
            Product.countDocuments({ quantity: { $gt: 0, $lte: 5 } }),
            Order.find()
                .sort({ createdAt: -1 })
                .limit(6)
                .populate('userId', 'firstName lastName userName email')
                .populate('products.productId', 'productName image productImages'),
            User.find()
                .sort({ createdAt: -1 })
                .limit(6)
                .select('firstName lastName userName email isAdmin createdAt'),
            Order.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
            ]),
            Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalPrice' },
                    },
                },
            ]),
            Product.aggregate([
                {
                    $group: {
                        _id: null,
                        totalUnits: { $sum: '$quantity' },
                        inventoryValue: {
                            $sum: {
                                $multiply: ['$price', '$quantity'],
                            },
                        },
                    },
                },
            ]),
        ]);

        const orderStatusMap = statusAggregation.reduce(
            (accumulator, item) => ({
                ...accumulator,
                [item._id || 'unknown']: item.count,
            }),
            {}
        );

        const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;
        const totalUnits = inventoryAggregation[0]?.totalUnits || 0;
        const inventoryValue = inventoryAggregation[0]?.inventoryValue || 0;

        return res.status(200).json({
            success: true,
            overview: {
                totals: {
                    products: totalProducts,
                    users: totalUsers,
                    orders: totalOrders,
                    invoices: totalInvoices,
                    revenue: totalRevenue,
                    totalUnits,
                    inventoryValue,
                },
                products: {
                    active: activeProducts,
                    outOfStock: outOfStockProducts,
                    lowStock: lowStockProducts,
                },
                orderStatus: {
                    pending: orderStatusMap.pending || 0,
                    processing: orderStatusMap.processing || 0,
                    shipped: orderStatusMap.shipped || 0,
                    delivered: orderStatusMap.delivered || 0,
                    cancelled: orderStatusMap.cancelled || 0,
                },
                recentOrders,
                recentUsers,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getAdminProducts = async (req, res, next) => {
    try {
        const { page, limit, skip } = buildPagination(req.query);
        const search = String(req.query.search || '').trim();
        const status = String(req.query.status || '').trim();

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (search) {
            const safeSearch = escapeRegex(search);
            filter.$or = [
                { productName: { $regex: safeSearch, $options: 'i' } },
                { shortDescription: { $regex: safeSearch, $options: 'i' } },
                { brand: { $regex: safeSearch, $options: 'i' } },
                { category: { $regex: safeSearch, $options: 'i' } },
                { company: { $regex: safeSearch, $options: 'i' } },
                { os: { $regex: safeSearch, $options: 'i' } },
            ];
        }

        const [products, total] = await Promise.all([
            Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Product.countDocuments(filter),
        ]);

        return res.status(200).json(
            buildPagedResponse({
                items: products.map(normalizeProduct),
                total,
                page,
                limit,
            })
        );
    } catch (error) {
        ProductErrorLogger.error(`Failed to fetch admin products: ${error.message}`);
        next(error);
    }
};

export const getAdminUsers = async (req, res, next) => {
    try {
        const { page, limit, skip } = buildPagination(req.query);
        const search = String(req.query.search || '').trim();
        const role = String(req.query.role || '').trim();

        const filter = {};

        if (role === 'admin') {
            filter.isAdmin = true;
        }

        if (role === 'customer') {
            filter.isAdmin = false;
        }

        if (search) {
            const safeSearch = escapeRegex(search);
            filter.$or = [
                { firstName: { $regex: safeSearch, $options: 'i' } },
                { lastName: { $regex: safeSearch, $options: 'i' } },
                { userName: { $regex: safeSearch, $options: 'i' } },
                { email: { $regex: safeSearch, $options: 'i' } },
                { phoneNumber: { $regex: safeSearch, $options: 'i' } },
            ];
        }

        const [users, total] = await Promise.all([
            User.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('-password')
                .populate('orders', 'totalPrice status createdAt'),
            User.countDocuments(filter),
        ]);

        const items = users.map((user) => ({
            _id: String(user._id),
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar || '',
            isAdmin: Boolean(user.isAdmin),
            ordersCount: Array.isArray(user.orders) ? user.orders.length : 0,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        return res.status(200).json(buildPagedResponse({ items, total, page, limit }));
    } catch (error) {
        UserErrorLogger.error(`Failed to fetch admin users: ${error.message}`);
        next(error);
    }
};

export const getAdminOrders = async (req, res, next) => {
    try {
        const { page, limit, skip } = buildPagination(req.query);
        const search = String(req.query.search || '').trim();
        const status = String(req.query.status || '').trim();

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const baseQuery = Order.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'firstName lastName userName email')
            .populate('products.productId', 'productName image productImages');

        let orders = await baseQuery;

        if (search) {
            const safeSearch = search.toLowerCase();
            orders = orders.filter((order) => {
                const userText = [
                    order.userId?.firstName,
                    order.userId?.lastName,
                    order.userId?.userName,
                    order.userId?.email,
                    order._id,
                    order.address,
                    order.status,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();

                return userText.includes(safeSearch);
            });
        }

        const total = search ? orders.length : await Order.countDocuments(filter);

        const items = orders.map((order) => ({
            _id: String(order._id),
            user: order.userId
                ? {
                      _id: String(order.userId._id),
                      firstName: order.userId.firstName,
                      lastName: order.userId.lastName,
                      userName: order.userId.userName,
                      email: order.userId.email,
                  }
                : null,
            products: order.products.map((item) => ({
                productId: item.productId?._id ? String(item.productId._id) : String(item.productId),
                productName: item.productId?.productName || 'Deleted product',
                image:
                    item.productId?.image ||
                    item.productId?.productImages?.[0] ||
                    '',
                quantity: item.quantity,
                priceAtPurchase: item.priceAtPurchase,
            })),
            productsCount: order.products.length,
            address: order.address,
            totalPrice: order.totalPrice,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));

        return res.status(200).json(buildPagedResponse({ items, total, page, limit }));
    } catch (error) {
        OrderErrorLogger.error(`Failed to fetch admin orders: ${error.message}`);
        next(error);
    }
};

export const updateAdminOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order status',
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        )
            .populate('userId', 'firstName lastName userName email')
            .populate('products.productId', 'productName image productImages');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            item: order,
        });
    } catch (error) {
        next(error);
    }
};

export const getAdminInvoices = async (req, res, next) => {
    try {
        const { page, limit, skip } = buildPagination(req.query);
        const search = String(req.query.search || '').trim();

        const invoices = await Invoice.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'firstName lastName userName email')
            .populate('orderId', 'status totalPrice createdAt');

        const filteredInvoices = search
            ? invoices.filter((invoice) => {
                  const haystack = [
                      invoice.invoiceNumber,
                      invoice.userId?.firstName,
                      invoice.userId?.lastName,
                      invoice.userId?.userName,
                      invoice.userId?.email,
                      invoice.orderId?._id,
                      invoice.orderId?.status,
                  ]
                      .filter(Boolean)
                      .join(' ')
                      .toLowerCase();

                  return haystack.includes(search.toLowerCase());
              })
            : invoices;

        const total = search ? filteredInvoices.length : await Invoice.countDocuments();

        const items = filteredInvoices.map((invoice) => ({
            _id: String(invoice._id),
            invoiceNumber: invoice.invoiceNumber,
            totalAmount: invoice.totalAmount,
            pdfUrl: invoice.pdfUrl || '',
            createdAt: invoice.createdAt,
            user: invoice.userId
                ? {
                      _id: String(invoice.userId._id),
                      firstName: invoice.userId.firstName,
                      lastName: invoice.userId.lastName,
                      userName: invoice.userId.userName,
                      email: invoice.userId.email,
                  }
                : null,
            order: invoice.orderId
                ? {
                      _id: String(invoice.orderId._id),
                      status: invoice.orderId.status,
                      totalPrice: invoice.orderId.totalPrice,
                      createdAt: invoice.orderId.createdAt,
                  }
                : null,
        }));

        return res.status(200).json(buildPagedResponse({ items, total, page, limit }));
    } catch (error) {
        next(error);
    }
};

export const updateAdminUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allowedFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'isAdmin'];
        const payload = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                payload[field] = req.body[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            item: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAdminUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (String(req.user.id) === String(id)) {
            return res.status(400).json({
                success: false,
                message: 'Admin accounts cannot delete themselves from this panel',
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const userInvoices = await Invoice.find({ userId: user._id }).select('_id');

        const archivedUser = new UsersArchives({
            _id: String(user._id),
            email: user.email,
            lastName: user.lastName,
            userName: user.userName,
            firstName: user.firstName,
            phoneNumber: user.phoneNumber,
            invoices: userInvoices.map((invoice) => invoice._id),
        });

        await archivedUser.save();
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'User deleted and archived successfully',
        });
    } catch (error) {
        next(error);
    }
};
