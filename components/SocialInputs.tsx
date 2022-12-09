import { ChangeEvent, useState } from 'react';
import ModalSocialMediaUsername from './ModalSocialMediaUsername';

type Props = {
  socialMediaLabel: string;
  socialMediaIcon: string;
  name?: string;
  placeholder?: string;
  value?: string;
};

const SocialInput: React.FC<Props> = ({
  socialMediaLabel,
  socialMediaIcon,
  name,
  placeholder,
}) => {
  return (
    <div className="flex mb-4">
      <div className="inline-flex items-center w-28 px-2 pr-3 text-sm text-gray-900 bg-gray-600 rounded-l-md border border-r-0 border-gray-600 select-none">
        <img className="w-8 h-8 mr-2" src={socialMediaIcon} />
        <p className="font-sans text-white font-medium">{socialMediaLabel}</p>
      </div>
      <input
        type="text"
        name={name}
        className="rounded-none placeholder:text-gray-400 text-center rounded-r-lg bg-gray-700 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-600 p-2.5"
        placeholder={
          placeholder
            ? placeholder
            : `Enter your ${socialMediaLabel.toLowerCase()} username`
        }
      />
    </div>
  );
};

export default SocialInput;
