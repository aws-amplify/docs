import { render, fireEvent, renderHook } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  it('should call callback when clicked outside', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useClickOutside(mockCallback));

    render(<div ref={result.current} />);

    // Simulate click outside
    fireEvent.click(document);

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should not call callback when clicked inside', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useClickOutside(mockCallback));

    const { getByTestId } = render(
      <div data-testid="inside" ref={result.current} />
    );

    // Simulate click inside
    fireEvent.click(getByTestId('inside'));

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should clean up event listener on unmount', () => {
    const mockCallback = jest.fn();
    const { unmount } = renderHook(() => useClickOutside(mockCallback));

    unmount();

    // Simulate click after unmount
    fireEvent.click(document);

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
