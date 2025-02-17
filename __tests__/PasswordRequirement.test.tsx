import { render, screen } from '@testing-library/react';
import { PasswordRequirement } from '../src/components/forms/PasswordRequirement';

describe('PasswordRequirement', () => {
  it('renders without crashing', () => {
    render(<PasswordRequirement text="Test requirement" isMet={false} />);
    expect(screen.getByText('Test requirement')).toBeInTheDocument();
  });

  it('shows check icon when requirement is met', () => {
    const { container } = render(
      <PasswordRequirement text="Test requirement" isMet={true} />,
    );
    const icon = container.querySelector('.text-green-500');
    expect(icon).toBeInTheDocument();
  });

  it('shows x mark icon when requirement is not met', () => {
    const { container } = render(
      <PasswordRequirement text="Test requirement" isMet={false} />,
    );
    const icon = container.querySelector('.text-red-500');
    expect(icon).toBeInTheDocument();
  });

  it('applies correct text color when requirement is met', () => {
    render(<PasswordRequirement text="Test requirement" isMet={true} />);
    const text = screen.getByText('Test requirement');
    expect(text).toHaveClass('text-gray-600');
  });

  it('applies correct text color when requirement is not met', () => {
    render(<PasswordRequirement text="Test requirement" isMet={false} />);
    const text = screen.getByText('Test requirement');
    expect(text).toHaveClass('text-gray-500');
  });
});
