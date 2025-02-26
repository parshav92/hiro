import { Feature } from "./Feature";

const features = [
  {
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with instant updates and shared boards. No more endless back-and-forth messages.",
  },
  {
    title: "Customizable Workspaces",
    description:
      "Organize everything visually in a way that makes sense to you. Perfect for brainstorming, planning, or just keeping things structured.",
  },
  {
    title: "Easy Guest Access",
    description:
      "No sign-up? No problem. Quickly share workspaces with others and collaborate without any hassle.",
  },
];


export const Features = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className='text-center font-bold text-5xl sm:text-6xl tracking-tighter'>All in one workspace</h2>
        <div className='max-w-xl mx-auto'>
        <p className='text-center mt-5 text-xl text-white/70'>
        Create, collaborate, and track changes in real time with live cursors, smart updates, and seamless teamwork.
        </p>
        </div>
        <div className='mt-16 flex flex-col sm:flex-row gap-4'>
          {features.map(({title,description})=>(
            <Feature title={title} description={description} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};
