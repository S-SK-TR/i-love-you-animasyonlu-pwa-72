import { renderHook, act } from '@testing-library/react';
import useAnimationStore from '../../src/store/animationStore';

describe('LoveCapsule Store', () => {
  it('should initialize with empty loveCapsule state', () => {
    const { result } = renderHook(() => useAnimationStore());
    expect(result.current.loveCapsule.messages).toEqual([]);
    expect(result.current.loveCapsule.currentCapsule).toBeNull();
  });

  it('should add a message to loveCapsule', () => {
    const { result } = renderHook(() => useAnimationStore());
    const newMessage = {
      id: '1',
      content: 'Test message',
      animationType: 'kalpGül',
      createdAt: new Date().toISOString()
    };

    act(() => {
      result.current.addMessage(newMessage);
    });

    expect(result.current.loveCapsule.messages).toHaveLength(1);
    expect(result.current.loveCapsule.messages[0]).toEqual(newMessage);
  });

  it('should remove a message from loveCapsule', () => {
    const { result } = renderHook(() => useAnimationStore());
    const message1 = {
      id: '1',
      content: 'Message 1',
      animationType: 'kalpGül',
      createdAt: new Date().toISOString()
    };
    const message2 = {
      id: '2',
      content: 'Message 2',
      animationType: 'patlama',
      createdAt: new Date().toISOString()
    };

    act(() => {
      result.current.addMessage(message1);
      result.current.addMessage(message2);
    });

    expect(result.current.loveCapsule.messages).toHaveLength(2);

    act(() => {
      result.current.removeMessage('1');
    });

    expect(result.current.loveCapsule.messages).toHaveLength(1);
    expect(result.current.loveCapsule.messages[0].id).toBe('2');
  });

  it('should set current capsule', () => {
    const { result } = renderHook(() => useAnimationStore());
    const capsule = {
      id: '1',
      theme: 'romantik',
      createdAt: new Date().toISOString()
    };

    act(() => {
      result.current.setCurrentCapsule(capsule);
    });

    expect(result.current.loveCapsule.currentCapsule).toEqual(capsule);
  });

  it('should update capsule theme', () => {
    const { result } = renderHook(() => useAnimationStore());
    const initialCapsule = {
      id: '1',
      theme: 'romantik',
      createdAt: new Date().toISOString()
    };

    act(() => {
      result.current.setCurrentCapsule(initialCapsule);
    });

    act(() => {
      result.current.updateCapsuleTheme('şefkatli');
    });

    expect(result.current.loveCapsule.currentCapsule.theme).toBe('şefkatli');
  });
});