import React from 'react';

export const Container: React.CSSProperties = {
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'linear-gradient(145deg, #0f172a, #1e293b)',
	padding: '20px',
	paddingTop: '100px', 
	boxSizing: 'border-box',
};

export const InsideDiv: React.CSSProperties = {
	textAlign: 'center',
	padding: '40px',
	borderRadius: '20px',
	backdropFilter: 'blur(12px)',
	background: 'rgba(255,255,255,0.05)',
	border: '1px solid rgba(255,255,255,0.1)',
	boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
	color: '#e5e7eb',
	width: '100%',
	maxWidth: '420px',
};

export const title404: React.CSSProperties = {
	fontSize: '90px',
	fontWeight: 700,
	margin: '10px 0',
	color: '#ffffff',
};

export const subtitle: React.CSSProperties = {
	opacity: 0.7,
	marginBottom: '20px',
};

export const buttonStyle: React.CSSProperties = {
	marginTop: '15px',
	borderRadius: '25px',
	padding: '10px 25px',
	background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
	color: '#fff',
};