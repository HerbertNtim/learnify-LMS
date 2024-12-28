import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Loading = () => {
  const loader = "Loading...";

  return (
    <div className="loading">
      <Loader2 className="loading__spinner" />
      <div>
        {loader.split("").map((text, index) => (
          <motion.span
            key={index}
            className="loading__text"
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y:  0,
              opacity: 1, // Fades in
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,  
            }}
          >
            {text}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
