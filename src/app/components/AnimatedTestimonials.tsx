import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The platform's insights into my coding habits have been a game-changer. It's helped me identify weak areas and improve steadily.",
      name: "Alice Johnson",
      designation: "Competitive Programmer",
      src: "https://res.cloudinary.com/dqm8rxpzq/image/upload/v1731656210/keene_u2upvf.jpg",
    },
    {
      quote:
        "With this tracker, I can monitor my progress across multiple platforms seamlessly. The integration is top-notch!",
      name: "David Lee",
      designation: "Software Developer at CodeFlow",
      src: "https://res.cloudinary.com/dqm8rxpzq/image/upload/v1731656710/Mark-Johnson_futlz6.jpg",
    },
    {
      quote:
        "I’ve improved my problem-solving skills significantly thanks to the detailed metrics and personalized recommendations.",
      name: "Maria Gonzalez",
      designation: "Data Science Enthusiast",
      src: "https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728748145/speaker-1_smbvhg.jpg",
    },
    {
      quote:
        "The platform's ability to track solved problems and suggest areas to focus on has been instrumental in my coding journey.",
      name: "John Carter",
      designation: "Full Stack Developer",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Keeping track of my coding stats and achievements has never been easier. This platform makes it all so convenient.",
      name: "Ashley Leeds",
      designation: "Tech Lead at DevHub",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div>
      <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        Testimonials
      </h1>

      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
