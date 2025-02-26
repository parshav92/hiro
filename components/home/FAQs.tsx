'use client';
import React from 'react';
import PlusIcon from '../assets/icons/plus.svg';
import MinusIcon from '../assets/icons/minus.svg';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    question: "How does it work?",
    answer:
      "You create a workspace, add notes, and collaborate in real time. Think of it like an infinite canvas where multiple people can work together.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "Nope! You can start right away with a guest account. Signing up just helps save your progress.",
  },
  {
    question: "Can I invite others?",
    answer:
      "Yep! Just send them a link, and they can jump in instantly.",
  },
  {
    question: "Is it free?",
    answer:
      "For now, yes! It’s a personal project, so everything is open to use.",
  },
  {
    question: "What about security?",
    answer:
      "Basic encryption is in place to keep things safe, but don’t store super sensitive info here.",
  },
];


const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      key={question}
      className="py-7 border-b border-white/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity:0,
              height:0,
              marginTop:0
            }}
            animate={{
              opacity:1,
              height:"auto",
              marginTop:'16px'
            }}
            exit={{
              opacity:0,
              height:0,
              marginTop:0
            }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#5D2CAB] to-black py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl sm:max-w-[648px] mx-auto font-bold tracking-tighter">
          Frequently asked questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">
          {items.map(({ question, answer }) => (
            <AccordionItem question={question} answer={answer} key={question} />
          ))}
        </div>
      </div>
    </div>
  );
};
