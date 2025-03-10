import Leaderboard from "@/components/Leaderboard";
import connectToDB from "@/app/lib/db";
import { Student } from "../../../../../models/student.model";
import { Subject } from "../../../../../models/subject.model";
import { Title } from "@mantine/core";

const LeaderboardComp = async ({ params }: { params: { name: string } }) => {
  const subject_name = params.name;
  const loggedInUser = "Hannah Ivy";
  try {
    await connectToDB();
    const subject = await Subject.find({ subject_name: subject_name });
    const students = await Student.find({ "subjects_with_exp.subject": subject[0]._id }).populate("subjects_with_exp.subject");
    console.log(students);
    students.sort(
      (a, b) =>
        b.subjects_with_exp.find((x) => x.subject.subject_name == subject_name)?.exp -
        a.subjects_with_exp.find((x) => x.subject.subject_name == subject_name)?.exp
    );
    const s = JSON.parse(JSON.stringify(students));
    return <Leaderboard data={s} loggedInUser={loggedInUser} subject={subject_name}></Leaderboard>;
  } catch {
    return <div>Some error occurred.</div>;
  }
};

export default LeaderboardComp;
