#!/usr/bin/env node

import * as p from "@clack/prompts";
import {setTimeout} from 'node:timers/promises'
import color from "picocolors";

class Question {
  constructor(question, answersArray, correctAnswerIndex) {
    this.question = question;
    this.answersArray = answersArray;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

const totalCorrect = 0;

const askQuestion = async (question, answersArray, correctAnswerIndex) => {
    const options = [];
    answersArray.forEach((answer)=>{
        options.push({
            value: answer,
            label: answer
        })
    })

    const answer = await p.select({
        message: question,
        initialValue: '1',
        options: options
    })

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if(answer == answersArray[correctAnswerIndex]){
        totalCorrect++;
    }
}

async function main(params) {
  // await setTimeout(1000); // ??

  p.intro(
    `${color.bgMagenta(
      color.black("Welcome, let us find out how much you know about sports")
    )}`
  );

  const question1 = new Question(
    `Question 1: What is the highest score possible in a single frame of bowling?`,
    ["A) 10", "B) 20", "C) 30", "D) 40"],
    2
  );

  const question3 = new Question(
    `Question 3: Which tennis tournament is played on a clay court and is part of the Grand Slam?
        `,
    ["A) Wimbledon", "B) US Open", "C) Australian Open", "D) French Open"],
    3
  );
  const question2 = new Question(
    `Question 2: In soccer, what is the term used when a player scores three goals in a single game?`,
    ["A) Double", "B) Hat trick", "C) Triple", "D) Goal rush"],
    1
  );

  const allQuestions = [question1, question3, question2];

  const readyToPlay = await p.select({
    message: "3 questions, results at the end. ready to play",
    initialValue: "Yes",
    options: [
      {
        value: "Yes",
        label: "Yes",
      },
      { value: "No", label: "No" },
    ],
  });

  if(readyToPlay === "Yes")
  {
    for(const question of allQuestions){
        await askQuestion(question.question, question.answersArray, question.correctAnswerIndex)
    }
  }

  if(totalCorrect === 3){
    p.outro(`🎉 correct answers, your score: ${totalCorrect}`)
  }else{
    p.outro(`🤖 Thank you for playing, your score: ${totalCorrect}`)
  }
}

main();
