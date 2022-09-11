//Analytics Dynamic Data Converter

/*function fixedFloatOrInt(n,decimals) { //es. n=9 decimals=2 => 9, n=8.789 decimals=2 => 8,79
  return isNaN(n) || n % 1 === 0 ? n : n.toFixed(decimals);
}*/

function getLearningLevel(data) {
  let correctPos = data.outcomes.findIndex(o => o.code == "OK");
  return (correctPos != -1 ? data.outcomes[correctPos].students : 0)*5/data.outcomes.reduce((a, b) => {return a + b.students}, 0);
}

function getGroupPL(data,totalStudents) {
  return data.outcomes.reduce((a, b) => {return a + b.students}, 0)*5/(totalStudents*data.quizzes);
}

function dynamicDataConverter(id,type,data,params) { //type: 0 = table.data, 1 = table.head, 2 = chart.series, 3 = chart.dynamicAdditions
  
  let outcomePos,quiz,row,outcome,remainingItems,sum;
  let convertedData = null;
  let categories = [];
  
  switch (id) {
    case "0":
      switch (type) {
        case 0:
          quiz = data.data.find(quiz => quiz._id.questionid == params.questionid);
          if (quiz != undefined) {
            convertedData = [];
            for (const rowTitle of params.allOutcomes) {
              outcome = quiz.outcomes[quiz.outcomes.findIndex(outcome => outcome.code == rowTitle.code)]
              convertedData.push([rowTitle.shortTitle,(outcome != undefined ? outcome.students*100/params.totalAnswers : 0) + "%"])
            }
          }
          break;
        case 2:
          quiz = data.data.find(quiz => quiz._id.questionid == params.questionid);
          if (quiz != undefined) {
            convertedData = [];
            for (const outcome of params.allOutcomes) {
              outcomePos = quiz.outcomes.findIndex(oc => oc.code == outcome.code);
              convertedData.push(outcomePos != -1 ? quiz.outcomes[outcomePos].students*100/params.totalAnswers : 0);
            }
          }
          break;
      }
      break;
    case "1":
      switch (type) {
        case 0:
          if (data.data.length > 0) {
            convertedData = [];
            for (const rowData of data.data) {
              row = [rowData._id];
              for (const outcome of params.allOutcomes) {
                outcomePos = rowData.outcomes.findIndex(oc => oc.code == outcome.code);
                row.push(Math.round(outcomePos != -1 ? rowData.outcomes[outcomePos].students*100/rowData.outcomes.reduce((a, b) => {return a + b.students}, 0) : 0) + "%");
              }
              convertedData.push(row);
            }
          }
          break;
        case 2:
          if (data.data.length > 0) {
            convertedData = [];
            for (const topic of data.data) {
              for (const outcome of params.allOutcomes) {
                convertedData.push({
                  name: outcome.title,
                  data: []
                });
                outcomePos = topic.outcomes.findIndex(oc => oc.code == outcome.code);
                convertedData[convertedData.length - 1].data.push(Math.round(outcomePos != -1 ? topic.outcomes[outcomePos].students*100/topic.outcomes.reduce((a, b) => {return a + b.students}, 0) : 0));
              }
            }
          }
          break;
        case 3:
          for (const topic of data.data) {
            categories.push(topic._id);
          }
          convertedData = {
            categories: categories
          }
          break;
      }
      break;
    case "4":
      switch (type) {
        case 0:
          if (data.data.length > 0) {
            convertedData = [];
            for (const topic of data.topicQuizzes) {
              sum = 0
              remainingItems = data.data.filter(q => q._id.topic == topic._id);
              for (const q of remainingItems) {
                sum += getLearningLevel(q);
              }
              convertedData.push([topic._id,Math.round(sum/topic.quizzes)]);
            }
          }
          break;
        case 2:
          if (data.data.length > 0) {
            convertedData = [{
              name: "Learning level",
              data: []
            }]
            for (const topic of data.topicQuizzes) {
              sum = 0;
              remainingItems = data.data.filter(q => q._id.topic == topic._id);
              for (const q of remainingItems) {
                sum += getLearningLevel(q);
              }
              convertedData[0].data.push(Math.round(sum/topic.quizzes));
            }
          }
          break;
        case 3:
          for (const topic of data.topicQuizzes) {
            categories.push(topic._id);
          }
          convertedData = {
            categories: categories
          }
          break;
      }
      break;
    case "5":
      switch (type) {
        case 0:
          if (data.data.length > 0) {
            convertedData = [];
            for (const rowData of data.data) {
              convertedData.push([rowData._id,Math.round(getGroupPL(rowData,params.totalStudents))]);
            }
          }
          break;
        case 2:
          if (data.data.length > 0) {
            convertedData = [{
              name: "Partecipation level",
              data: []
            }]
            for (const rowData of data.data) {
              convertedData[0].data.push(Math.round(getGroupPL(rowData,params.totalStudents)));
            }
          }
          break;
        case 3:
          for (const topic of data.data) {
            categories.push(topic._id);
          }
          convertedData = {
            categories: categories
          }
          break;
      }
      break;
    default:
      console.error("id errato");
      break;
  }
  return convertedData;
}

export default dynamicDataConverter;