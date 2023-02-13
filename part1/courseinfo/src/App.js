const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.partList[0]} />
      <Part part={props.partList[1]} />
      <Part part={props.partList[2]} />
    </>
  );
};

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.numberOfExercise}</p>
  );
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.partList[0].numberOfExercise + props.partList[1].numberOfExercise + props.partList[2].numberOfExercise}</p>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const partList = [
    { name: 'Fundamentals of React', numberOfExercise: 10 },
    { name: 'Using props to pass data', numberOfExercise: 7 },
    { name: 'State of a component', numberOfExercise: 14 }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content partList={partList} />
      <Total partList={partList} />
    </div>
  );
};

export default App;