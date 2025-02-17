import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '../src/components/forms/PasswordStrength';

describe('PasswordStrength', () => {
  it('renders without crashing', () => {
    render(<PasswordStrength password="" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows red for weak passwords', () => {
    render(<PasswordStrength password="weak" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-red-500');
  });

  it('shows yellow for moderate passwords', () => {
    render(<PasswordStrength password="Weak123" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-yellow-500');
  });

  it('shows blue for strong passwords', () => {
    render(<PasswordStrength password="Strong123" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-blue-500');
  });

  it('shows green for very strong passwords', () => {
    render(<PasswordStrength password="VeryStrong123!@" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-green-500');
  });

  it('calculates correct width based on strength', () => {
    render(<PasswordStrength password="Strong123" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.width).toBe('80%'); // 4/5 * 100%
  });
});
