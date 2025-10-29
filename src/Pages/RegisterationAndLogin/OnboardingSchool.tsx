import React, {useState} from "react";
import ImageSection from "../../Components/GeneralComponents/ImageSection";
import ProgressBar from "../../Components/GeneralComponents/ProgressBar";
import CustomRadioInput from "../../Components/GeneralComponents/CustomRadioInput";
import Button from "../../Components/GeneralComponents/Button";

const OnboardingSchool: React.FC = () => {
  const [pageNum, setPageNum] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});


  const questions = [
    {
      id: 1,
      type: "radio",
      question: "Why are you joining QuanVaulte?",
      options: [
        { label: "I’m a Student.",  subtext: "Learn tech skills, earn badges, and get certified.", value: "Student" },
        { label: "I’m a School or Teacher", subtext: "Enroll students, assign courses, and track progress.", value: "School" },
        { label: "I’m a Parent", subtext: "Track your child’s learning progress and achievements.", value: "Parent" },
      ],
      bubbleText: "Learning is fun Using QuanVault",
    },
    {
      id: 2,
      type: "multi-input",
      question: "Whats the name of your school?",
      inputs:[
        {name:"schoolName", placeholder: "School name"},
        {name:"schoolAddress", placeholder: "School address"},
        {name:"PostalCode", placeholder: "Postal code"}
      ],
      bubbleText: "Let’s get started! What’s your school’s name?",
    },
    
    {
      id: 3,
      type: "radio",
      question: "How many kids will be using quanvaulte",
      options: [
        { label: "1–20", value: "1–20" },
        { label: "21–50", value: "21–50" },
        { label: "51–100", value: "51–100" },
        { label: "100–200", value: "100–200" },
        { label: "300–500", value: "300–500" },
        { label: "500+", value: "500+" },
      ],
      bubbleText: "The more, the merrier! How many students are joining in?",
    },

    {
      id: 4,
      type: "radio",
      question: "How often do you want progress updates?",
      options: [
        { label: "Weekly summary", value: "Weekly summary" },
        { label: "Monthly overview", value: "Monthly overview" },
        { label: "Only major milestones", value: "Only major milestones" },
      ],
      bubbleText: "Let’s set your preferred update schedule",
    },
    
     {
      id: 5,
      type: "radio",
      question: "Would you like to set learning goals or rewards for your Students?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      bubbleText: "I can help track progress and celebrate achievements",
    },
    {
      id: 6,
      type: "radio",
      question: "Would you like student to see external community",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      bubbleText: "Want your learners to interact with a wider community?",
    }
  ];

  const totalPages = questions.length;
  const currentQuestion = questions[pageNum - 1];

  const handleNext = () => {
    if (pageNum < totalPages) setPageNum((prev) => prev + 1);
    else console.log("School details:", answers);
  };

  const handlePrev = () => {
    if (pageNum > 1) setPageNum((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ImageSection
        bubbleText={currentQuestion.bubbleText}
      />

      <div className="flex flex-col justify-between w-full md:w-1/2 bg-white p-8 md:p-16">
        <ProgressBar pageNum={pageNum} totalPages={totalPages} />

        <div className="flex flex-col space-y-6 mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === "multi-input" && (
  <div className="flex flex-col gap-4">
    {currentQuestion.inputs?.map((input, index) => (
      <input
        key={index}
        type="text"
        placeholder={input.placeholder}
        value={answers[input.name] || ""}
        onChange={(e) =>
          setAnswers((prev) => ({
            ...prev,
            [input.name]: e.target.value,
          }))
        }
        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />
    ))}
    </div>
)}

          {currentQuestion.type === "radio" && (
            <CustomRadioInput
              options={currentQuestion.options || []}
              selectedValue={answers[currentQuestion.id] || ""}
              onChange={(value) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: value,
                }))
              }
            />
          )}
        </div>

       
        <div className="flex justify-between mt-10">
          
          <Button
          label="Back"
          variant="custom"
          onClick={handlePrev}
          disabled={pageNum === 1}
          className={`px-6 py-2 rounded-lg font-semibold border ${
              pageNum === 1
                ? "border-gray-300 text-gray-400 "
                : "border-blue-500 text-blue-600 hover:bg-blue-50 cursor-pointer"
            }`}
          />

          <Button
          label={pageNum === totalPages ? "Finish" : "Next"}
          variant="custom"
          className="px-6 py-2 rounded-lg font-semibold bg-[#2C43EB] text-white hover:bg-blue-600 cursor-pointer "
          onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingSchool;