import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import * as style from '../styles/notFoundStyles';

const NotFound: React.FC = () => {
	return (
		<div style={style.Container}>
			<div style={style.InsideDiv}>
				<h2>Page not found</h2>

				<h1 style={style.title404}>404</h1>

				<p style={style.subtitle}>
					We couldn't find what you're looking for
				</p>

				<Link to="/">
					<Button variant="contained" style={style.buttonStyle}>
						Back Home
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;