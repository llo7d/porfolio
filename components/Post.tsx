import Link from 'next/link';

type Props = {
  title: string;
  url: string;
  level: string;
  date: string;
  posted: string;
  body: string;
  tags: {
    id: number;
    label: string;
    color: string;
  }[];
};

const Post: React.FC<Props> = ({
  title,
  url,
  level,
  date,
  posted,
  body,
  tags,
}) => {
  const isLongBody = body.split(' ').length > 25;
  const truncatedBody = body.split(' ').slice(0, 25).join(' ');

  return (
    <div className="py-6 px-8 bg-gray-800 rounded-xl mb-8 transition-shadow duration-300 hover:shadow-2xl">
      <div className="flex justify-between">
        <div className="w-[80%]">
          <Link legacyBehavior href={url}>
            <a>
              <h2 className="text-xl text-white font-medium mb-5">{title}</h2>
            </a>
          </Link>
          <p className="text-white text-xs mb-3">
            Level Required - {level} - Posted {posted}
          </p>
          <p className="text-white font-sans mb-6 text-xs">
            {isLongBody ? (
              <>
                {truncatedBody}
                <Link legacyBehavior href={url}>
                  <a className="text-white font-medium"> ...read more</a>
                </Link>
              </>
            ) : (
              body
            )}
          </p>
        </div>
        {/* // Heart posts as favourite, in the future. */}
        {/* <button
          className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center"
          type="button"
          onClick={onClickFavourite}
        >
          <HeartIcon
            className={`w-4 h-4 ${
              isFavourite ? 'text-red-500' : 'text-gray-700'
            }`}
          />
        </button> */}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 w-[80%]">
          {tags.map((tag) => {
            return (
              <span
                key={tag.id}
                style={{
                  backgroundColor: tag.color,
                }}
                className={`text-white text-xs font-sans px-2 py-1 rounded`}
              >
                {tag.label}
              </span>
            );
          })}
        </div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
};

export default Post;
