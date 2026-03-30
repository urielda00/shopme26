import { FC, Suspense, lazy, useRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';

const MotionBox = motion(Box);
const OffersSection = lazy(() => import('../components/home/OffersSection'));
const FeaturedCarousel = lazy(() => import('../components/home/FeaturedCarousel'));

// Animation settings
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const HomePage: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (isScrolling.current) return;
            
            // Ignore small scroll movements to prevent accidental triggers
            if (Math.abs(e.deltaY) < 15) return;

            isScrolling.current = true;
            
            const direction = e.deltaY > 0 ? 1 : -1;
            const start = container.scrollTop;
            const target = start + (direction * window.innerHeight);
            const maxScroll = container.scrollHeight - window.innerHeight;
            const clampedTarget = Math.max(0, Math.min(target, maxScroll));

            if (start === clampedTarget) {
                isScrolling.current = false;
                return;
            }

            // Easing function for a luxurious, calm transition (easeInOutQuart)
            const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            
            // Duration of the scroll animation in milliseconds
            const duration = 1200; 
            const startTime = performance.now();

            const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = easeInOutQuart(progress);
                
                container.scrollTop = start + (clampedTarget - start) * easeProgress;

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    // Small cooldown to prevent immediate scrolling after animation
                    setTimeout(() => {
                        isScrolling.current = false;
                    }, 300);
                }
            };

            requestAnimationFrame(animateScroll);
        };

        // Passive false is required to allow e.preventDefault()
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <Box 
            ref={containerRef}
            sx={{ 
                width: '100vw', 
                height: '100vh', 
                overflowY: 'auto',
                overflowX: 'hidden',
                background: 'linear-gradient(to bottom, #000000 0%, #0d0d0d 40%, #151515 100%)',
                color: '#fff',
                
                // Hardware acceleration for smoother scrolling
                willChange: 'scroll-position',
                
                // Hide scrollbar completely
                msOverflowStyle: 'none', 
                scrollbarWidth: 'none', 
                '&::-webkit-scrollbar': { 
                    display: 'none' 
                }
            }}>
            
            {/* Section 1: Hero */}
            <Box sx={{ height: '100vh', width: '100%' }}>
                <HeroSection />
            </Box>

            <Suspense fallback={
                <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: 'rgba(255,255,255,0.2)' }} />
                </Box>
            }>
                {/* Section 2: Offers */}
                <MotionBox 
                    initial="hidden"
                    whileInView="visible"
                    // Changed amount to 0.1 so the animation triggers earlier, reducing stutter
                    viewport={{ once: false, amount: 0.1 }}
                    variants={sectionVariants}
                    sx={{ 
                        height: '100vh', 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <OffersSection />
                </MotionBox>
                
                {/* Section 3: Featured Carousel */}
                <MotionBox 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={sectionVariants}
                    sx={{ 
                        height: '100vh', 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <FeaturedCarousel />
                </MotionBox>
            </Suspense>
        </Box>
    );
};

export default HomePage;