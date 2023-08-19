import openai from "@/openai";
import { NextResponse } from "next/server";

//     {
//     model: "gpt-3.5-turbo",
//     temperature: 0.8,
//     n: 1,
//     stream: false,
//     messages: [
//       {
//         role: "system",
//         content: `When responding , welcome the user always as Mr.Sonny and say welcome to the PARAFAM todo App ! Limit the response to the 200 characters !`,
//       },
//       {
//         role: "user",
//         content: `Hi there,provide a summary of the following todos .Count how many todos are in each category
//           such as To DO progress and done, then tell the ser to have a productive day ! here's the data ${JSON.stringify(
//             todos
//           )}`,
//       },
//     ],
//   }
export async function GET(request: Request) {
  //   const { todos } = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "give me an idea" }],
    model: "gpt-3.5-turbo",
  });

  //   const { data } = response;
  //   console.log("Data is :" + data);
  //   console.log("Data is :" + data.choices[0].message);

  return NextResponse.json(completion.choices[0]);
}
