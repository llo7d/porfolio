import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const PostLoader: React.FC<Props> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-6 px-8 bg-gray-800 rounded-xl mb-8"
    >
      <div className="flex justify-between animate-pulse">
        <motion.div
          className="w-[80%] mb-7"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delayChildren: 0.5,
            staggerChildren: 0.2,
            duration: 0.3,
          }}
        >
          <motion.div className="md:w-32 w-24 h-4 rounded-full bg-gray-600 mb-8" />
          <motion.div className="md:w-48 w-32 h-2 rounded-full bg-gray-600 mb-2" />
          <motion.div className="md:w-96 w-56 h-2 rounded-full bg-gray-600 mb-2" />
          <motion.div className="md:w-96 w-56 h-2 rounded-full bg-gray-600 mb-2" />
          <motion.div className="md:w-96 w-56 h-2 rounded-full bg-gray-600" />
        </motion.div>
        <div className="w-7 h-7 rounded-full bg-gray-600" />
      </div>
      <motion.div
        className="flex items-center justify-between animate-pulse"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delayChildren: 0.5, staggerChildren: 0.2 }}
      >
        <div className="flex gap-2 w-[80%]">
          <div className="w-24 h-4 rounded-full bg-gray-600" />
          <div className="w-24 h-4 rounded-full bg-gray-600" />
          <div className="w-24 h-4 rounded-full bg-gray-600" />
        </div>
        <div className="w-16 h-4 rounded-full bg-gray-600" />
      </motion.div>
    </motion.div>
  );
};

export default PostLoader;
