import { act, renderHook, render } from '@testing-library/react';
import { useTabKeyDetection } from '../useTabKeyDetection';
import { RefObject } from 'react';

describe('useTabKeyDetection', () => {
  const createMockRef = (): RefObject<HTMLElement> => {
    const { getByTestId } = render(<div data-testid="test-mock-id" />);

    const mockElement = getByTestId('test-mock-id');

    return {
      current: mockElement
    };
  };

  const sendKeyboardEvent = (mockRef, eventType, key) => {
    act(() => {
      const event = new KeyboardEvent(eventType, { key: key });
      mockRef.current?.dispatchEvent(event);
    });
  };

  it('should initially set isTabKeyPressed to false', () => {
    const mockRef = createMockRef();
    const { result } = renderHook(() => useTabKeyDetection(mockRef));

    expect(result.current.isTabKeyPressed).toBe(false);
  });

  it('should set isTabKeyPressed to true when Tab key is pressed', () => {
    const mockRef = createMockRef();
    const { result } = renderHook(() => useTabKeyDetection(mockRef));

    // Simulate pressing the Tab key
    sendKeyboardEvent(mockRef, 'keydown', 'Tab');

    expect(result.current.isTabKeyPressed).toBe(true);
  });

  it('should set isTabKeyPressed to false when Tab key is released', () => {
    const mockRef = createMockRef();
    const { result } = renderHook(() => useTabKeyDetection(mockRef));

    // Simulate pressing the Tab key
    sendKeyboardEvent(mockRef, 'keydown', 'Tab');

    // Simulate releasing the Tab key
    sendKeyboardEvent(mockRef, 'keyup', 'Tab');

    expect(result.current.isTabKeyPressed).toBe(false);
  });

  it('should not set isTabKeyPressed to true when another key is pressed', () => {
    const mockRef = createMockRef();
    const { result } = renderHook(() => useTabKeyDetection(mockRef));

    // Simulate pressing the Enter key
    sendKeyboardEvent(mockRef, 'keydown', 'Enter');

    expect(result.current.isTabKeyPressed).toBe(false);
  });

  it('should clean up event listeners on unmount', () => {
    const mockRef = createMockRef();
    const { result, unmount } = renderHook(() => useTabKeyDetection(mockRef));

    unmount();

    // Simulate pressing the Tab key
    sendKeyboardEvent(mockRef, 'keydown', 'Tab');

    expect(result.current.isTabKeyPressed).toBe(false);
  });
});
