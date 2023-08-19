import Feature from "@/components/homepage/Feature";
const icons = [
  "update.svg",
  "analytics.svg",
  "discussion.svg",
  "anticheat.svg",
  "link.svg",
  "randomize.svg",
  "report.svg",
  "allocation.svg",
];
const titles = [
  "Auto-Update Results",
  "Exam Analytics",
  "Discussion Forum",
  "Advanced Anti-Cheat",
  "Exam Code",
  "Randomized Choices",
  "Report",
  "Merit-wise Allocation",
];
const details = [
  "Form updates are automatically saved in the server on each change",
  "Detailed view on the statistics of an exam",
  "Participants can ask for clarifications and solutions after the exam has ended",
  "The Examination environment is strictly monitored",
  "Each exam has a unique code that is shared with the participants",
  "Choices are randomized for each participant",
  "Feel free to report any potentially incorrect questions",
  "Secure top colleges with our merit-based allocation system",
];
const Feed = () => {
  return (
    <div className="flex flex-wrap mt-10">
      {icons.map((icon, index) => {
        return (
          <div className="w-1/4" key={index}>
            <Feature
              svgLink={`/assets/icons/features/${icon}`}
              title={titles[index]}
              details={details[index]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
