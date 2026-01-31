'use client';

import React, {
  forwardRef,
 
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface DropdownListProps {
  setItemChange: (value: any) => void;
  onChangeText?: (text: string) => void;
  value: any;
  loading?: boolean;
  placeholder: string;
  icon?: React.ReactNode;
  modalcheck?: () => Promise<boolean>;
  onclose?: () => void;
  onShow?: () => void;
  renderItem?: (props: any) => React.ReactNode;
  onEndReached?: () => void;
  data: any[];
}

const DropdownList = forwardRef<any, DropdownListProps>(
  (
    {
      modalcheck,
      onclose,
      loading,
      placeholder = '',
      value,
      onShow,
      icon,
      renderItem,
      setItemChange,
      onEndReached,
      data: data_,
      onChangeText,
      // ...prop
    },
    ref
  ) => {
    const [filter, setFilter] = useState('');
    const [visible, setVisible] = useState(false);
    const [loader, setLoader] = useState<any>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const timeout = timeoutRef.current;
      if (timeout) {
        clearTimeout(timeout);
      }
      if (filter && onChangeText) {
        timeoutRef.current = setTimeout(() => {
          onChangeText(filter.trim());
        }, 1500);
      }

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [filter, onChangeText]);

    useImperativeHandle(ref, () => ({
      visible,
      setVisible,
    }));

    useEffect(() => {
      if (value) {
        setVisible(false);
      }
    }, [value?.id]);

    useEffect(() => {
      if (visible === false && onclose) {
        onclose();
      }
    }, [visible, onclose]);

    useEffect(() => {
      if (visible && onShow) {
        onShow();
      }
    }, [visible]);

    const renderItemCallback = useCallback(
      (item: any, index: number) => {
        return (
          <div key={item.id} className="flex items-center justify-between gap-3 px-4">
            <div className="w-[95%]">
              {renderItem
                ? renderItem({ item, index, setValue: setItemChange, loader, setLoader })
                : null}
            </div>

            {((loader && loader?.id) === item.id && (
              <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-black rounded-full" />
            )) ||
              (value && value.id === item.id && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
          </div>
        );
      },
      [value, loader, renderItem, setItemChange]
    );

    const handleModal = async () => {
      if (modalcheck) {
        const result = await modalcheck();
        if (!result) {
          return;
        }
      }
      setVisible(true);
    };

    const handleScroll = () => {
      if (!scrollContainerRef.current || !onEndReached) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        onEndReached();
      }
    };

    return (
      <>
        {/* Button */}
        <button
          onClick={handleModal}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 
                   bg-transparent border border-gray-300 rounded-lg 
                   hover:border-gray-400 transition-colors text-left"
        >
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <span className="flex-1 text-black truncate">
            {value && data_ && data_.find((e) => e.id === value.id)
              ? value.value
              : placeholder
              ? placeholder
              : 'Select an item'}
          </span>
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Modal */}
        {visible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col m-4">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-4 py-2 bg-blue-50 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setVisible(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* List */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto py-4 space-y-2"
              >
                {loading && data_.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-500 rounded-full" />
                  </div>
                ) : data_.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">You have an empty list</div>
                ) : (
                  data_.map((item, index) => renderItemCallback(item, index))
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

DropdownList.displayName = 'DropdownList';

export { DropdownList };