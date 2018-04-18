import React from 'react';
import ReactDOM from 'react-dom';

const schoolRecord = {
  name: 'Ricy',
  records: [
    { subject: 'Math', score: 100 },
    { subject: 'Chinese', score: 87 }],
};

const Subject = props => (
  <tr>
    <th>{props.item.subject}</th>
    <th>{props.item.score}</th>
  </tr>
);

const Caption = props => (
  <caption>{props.name}'s Score</caption>
);

const SubjectList = props => (
  <tbody>{props.records.map(record => <Subject item={record} />)}</tbody>
);

const ScoreCard = props => (
  <div>
    <table border="2px">
      <Caption name={props.scoreCard.name} />
      <thead>
        <tr>
          <th>Subject</th>
          <th>Score</th>
        </tr>
      </thead>
      <SubjectList records={props.scoreCard.records} />
    </table>
  </div>
);

ReactDOM.render(<ScoreCard scoreCard={schoolRecord} />, document.getElementById('root'));
