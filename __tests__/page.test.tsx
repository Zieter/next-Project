import React from 'react'; // jest要求引入
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/home/page';

describe('Home', () => {
    it('renders the HomePage text', () => {
        render(<Home />);
        expect(screen.getByText('HomePage')).toBeInTheDocument();
    });

    it('renders the link to the products page', () => {
        render(<Home />);
        const linkElement = screen.getByText('去產品頁');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/products');
    });
});