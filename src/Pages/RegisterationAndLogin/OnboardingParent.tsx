import React, { useState } from "react";
import ImageSection from "../../Components/GeneralComponents/ImageSection";
import ProgressBar from "../../Components/GeneralComponents/ProgressBar";
import CustomRadioInput from "../../Components/GeneralComponents/CustomRadioInput";
import Button from "../../Components/GeneralComponents/Button";

const OnboardingParent: React.FC = () => {
  const [pageNum, setPageNum] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const questions = [
    {
      id: 1,
      type: "radio",
      question: "Why are you joining QuanVaulte?",
      options: [
        {
          label: "I’m a Student.",
          subtext: "Learn tech skills, earn badges, and get certified.",
          value: "Student",
        },
        {
          label: "I’m a School or Teacher",
          subtext: "Enroll students, assign courses, and track progress.",
          value: "School",
        },
        {
          label: "I’m a Parent",
          subtext: "Track your child’s learning progress and achievements.",
          value: "Parent",
        },
      ],
      bubbleText: "Learning is fun Using QuanVault",
    },
    {
      id: 2,
      type: "radio",
      question: "How many kids will be using quanvaulte",
      options: [
        { label: "A child", value: "A child" },
        { label: "2 kids", value: "2 kids" },
        { label: "3 kids", value: "3 kids" },
        { label: "4 kids", value: "4 kids" },
        { label: "5 kids", value: "5 kids" },
        { label: "5+", value: "5+" },
      ],
      bubbleText: "Want to set up for your kids?, nice i love studdies buddies",
    },
    {
      id: 3,
      type: "radio",
      question: "How often do you want progress updates?",
      options: [
        { label: "Weekly summary", value: "Weekly summary" },
        { label: "Monthly overview", value: "Monthly overviews" },
        { label: "Only major milestones", value: "Only major milestones" },
      ],
      bubbleText: "No surprise how often I share your child’s progress",
    },
    {
      id: 4,
      type: "radio",
      question:
        "Would you like to set learning goals or rewards for your Students?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      bubbleText: "Goals and rewards make learning super fun!",
    },
    {
      id: 5,
      type: "radio",
      question: "Would you like student to see external community",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      bubbleText: "Let’s help your child make new learning buddies",
    },
  ];

  const totalPages = questions.length;
  const currentQuestion = questions[pageNum - 1];

  const handleNext = () => {
    if (pageNum < totalPages) setPageNum((prev) => prev + 1);
    else console.log("Submit Answers:", answers);
  };

  const handlePrev = () => {
    if (pageNum > 1) setPageNum((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ImageSection bubbleText={currentQuestion.bubbleText} />

      <div className="flex flex-col justify-between w-full md:w-1/2 bg-white p-8 md:p-16">
        <ProgressBar pageNum={pageNum} totalPages={totalPages} />

        <div className="flex flex-col space-y-6 mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {currentQuestion.question}
          </h2>

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

export default OnboardingParent;
