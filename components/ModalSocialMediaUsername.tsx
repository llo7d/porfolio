import Link from 'next/link';
import { forwardRef, useEffect, useRef } from 'react';

type Props = {
  socialMedia?: string;
  username?: string | null | undefined | null;
  isOpen?: boolean;
  onRequestClose?: () => void;
  link?: string;
};

const ModalSocialMediaUsername: React.FC<Props> = forwardRef(
  ({ socialMedia, username, isOpen, onRequestClose, link }, ref) => {
    const refModalDetailElement = useRef(null);
    const refModalDetail = useRef<any>(null);

    useEffect(() => {
      import('flowbite').then(() => {
        if (typeof window !== 'undefined') {
          if (refModalDetailElement.current) {
            const options = {
              backdropClasses:
                'bg-black bg-opacity-70 backdrop-blur-sm fixed inset-0 z-40',
              onHide: () => {
                document.body.style.overflow = 'auto';

                onRequestClose?.();
              },
              onShow: () => {
                document.body.style.overflow = 'hidden';
              },
              onToggle: () => {},
            };

            refModalDetail.current = new Modal(
              refModalDetailElement.current,
              options
            );
          }
        }
      });
    }, []);

    useEffect(() => {
      if (isOpen) {
        refModalDetail.current?.show();
      } else {
        refModalDetail.current?.hide();
      }
    }, [isOpen]);

    return (
      <div
        ref={refModalDetailElement}
        tabIndex={-1}
        aria-hidden='true'
        className='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'
        onClick={onRequestClose}
      >
        <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
          <div
            className='relative rounded-lg shadow bg-gray-700'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex justify-between items-start py-4 px-6 rounded-t border-b border-gray-600'>
              <h3 className='text-xl font-semibold text-white'>
                Connect with {socialMedia}
              </h3>
              <button
                type='button'
                className='text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                onClick={onRequestClose}
              >
                <svg
                  aria-hidden='true'
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <div className='px-6 py-12'>
              {/* <a href={link} target="_blank">
                <p className="text-center font-bold text-xl text-gray-900 dark:text-gray-400">
                  {socialMedia} name:&nbsp;&nbsp;
                  <span className="text-white">{username}</span>
                </p>
              </a> */}

              <p className='text-center font-bold text-xl text-gray-900 dark:text-gray-400'>
                {socialMedia} name:&nbsp;&nbsp;
                <span className='text-white'>{username}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ModalSocialMediaUsername.displayName = 'ModalSocialMediaUsername';

export default ModalSocialMediaUsername;
