'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchUsers } from '../services/api';
import Loading from './Loading';
import { Navbar } from './Navbar';
import UserCard from './UserCard';
import { User } from '../types/user';
import { ApiError } from '../types/api';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';

const UserList = () => {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(
    async (pageToLoad: number) => {
      if (loadingRef.current || !hasMore) return;

      loadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUsers(pageToLoad);
        setUsers((prev) => [...prev, ...data.data]);
        setPage(pageToLoad + 1);
        setHasMore(data.page < data.total_pages);
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : 'An unexpected error occurred';
        setError(message);
        setHasMore(false);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    [hasMore],
  );

  const checkShouldLoadMore = useCallback(() => {
    const container = containerRef.current;
    if (!container || loadingRef.current || !hasMore) return;

    const { scrollHeight, clientHeight } = container;
    if (scrollHeight <= clientHeight + 100) {
      loadUsers(page);
    }
  }, [page, hasMore, loadUsers]);

  const scrollToTop = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollDuration = 300; // Duration in milliseconds
    const scrollHeight = container.scrollTop;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;

    let scrollCount = 0;
    let scrollMargin;

    const scrollInterval = setInterval(() => {
      if (container.scrollTop === 0) {
        clearInterval(scrollInterval);
        return;
      }

      scrollCount += 1;
      scrollMargin =
        cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
      container.scrollTo(0, scrollHeight - scrollMargin);
    }, 15);
  };

  const handleScrollPosition = () => {
    const container = containerRef.current;
    if (!container) return;
    setShowScrollTop(container.scrollTop > 500);
  };

  const handleUserClick = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  // Initial load effect

  useEffect(() => {
    if (!initialLoading) {
      loadUsers(1);
    }
  }, [loadUsers, initialLoading]);

  const handleLoadingComplete = useCallback(() => {
    setInitialLoading(false);
    loadUsers(1);
  }, [loadUsers]);

  // Check content height after users are updated
  useEffect(() => {
    checkShouldLoadMore();
  }, [users, checkShouldLoadMore]);

  // Scroll and resize handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      handleScrollPosition();
      if (loadingRef.current || !hasMore) return;

      const { scrollHeight, scrollTop, clientHeight } = container;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadUsers(page);
      }
    };

    // Create resize observer to check content height when container size changes
    const resizeObserver = new ResizeObserver(() => {
      checkShouldLoadMore();
    });

    container.addEventListener('scroll', handleScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [page, hasMore, checkShouldLoadMore, loadUsers]);

  if (initialLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading useTimer onComplete={handleLoadingComplete} className="h-16" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div ref={containerRef} className="h-screen overflow-y-auto">
        <Navbar title="Users" />

        {error && (
          <div className="px-4 py-3 bg-red-100 text-red-700 rounded-md mx-4 mt-4">
            {error}
          </div>
        )}

        <div className="px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {users.map((user, index) => (
                <UserCard
                  key={`${user.id}-${index}`}
                  user={user}
                  onClick={handleUserClick}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              {loading && <Loading className="h-16" />}
              {!hasMore && (
                <p className="text-center text-gray-600">
                  No more users to load
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            variant="ghost"
            className="fixed bottom-6 right-6 w-12 h-12 bg-gray-100/90 hover:bg-gray-200/90 rounded-full shadow-lg hover:shadow-xl grid place-items-center"
            aria-label="Scroll to top"
            icon={
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            }
          />
        )}
      </div>
    </main>
  );
};

export default UserList;
