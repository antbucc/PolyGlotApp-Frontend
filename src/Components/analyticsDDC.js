//Analytics Dynamic Data Converter

function fixedFloatOrInt(n,decimals) { //es. n=9 decimals=2 => 9, n=8.789 decimals=2 => 8,79
  return isNaN(n) || n % 1 === 0 ? n : n.toFixed(decimals);
}

function getLearningLevel(data) {
  return data.outcomes[data.outcomes.findIndex(o => o.code == "OK")].students*5/data.outcomes.reduce((a, b) => {return a + b.students}, 0);
}

function getPartecipationLevel(data,totalStudents) {
  return data.outcomes.reduce((a, b) => {return a + b.students}, 0)*5/(totalStudents*data.quizzes);
}

function dynamicDataConverter(id,type,data,params) { //type: 0 = table.data, 1 = table.head, 2 = chart.series, 3 = chart.dynamicAdditions
  
  let outcomePos,quiz,row,outcome,remainingItems,categories;
  let convertedData = categories = [];
  
  switch (id) {
    case "0":
      switch (type) {
        case 0:
          quiz = data.data.find(quiz => quiz._id.questionid == params.questionid);
          for (const rowTitle of params.allOutcomes) {
            outcome = quiz.outcomes[quiz.outcomes.findIndex(outcome => outcome.code == rowTitle.code)]
            convertedData.push([rowTitle.title,outcome != undefined ? outcome.students : 0])
          }
          break;
        case 2:
          convertedData = new Array(params.allOutcomes.length).fill(0);
          data.data.find(quiz => quiz._id.questionid == params.questionid).outcomes.forEach(outcome => {
            outcomePos = params.allOutcomes.findIndex(oc => oc.code == outcome.code);
            convertedData[outcomePos] = outcome.students;
          });
          break;
      }
      break;
    case "1":
      switch (type) {
        case 0:
          for (const rowData of data.data) {
            row = new Array(params.allOutcomes.length+2).fill(0);
            row[0] = rowData._id;
            row[1] = rowData.quizzes;
            for (const outcome of rowData.outcomes) {
              outcomePos = params.allOutcomes.findIndex(oc => oc.code == outcome.code) + 2;
              row[outcomePos] = outcome.students;
            }
            convertedData.push(row);
          }
          break;
          case 2:
            for (const outcome of params.allOutcomes) {
              convertedData.push({
                name: outcome.title,
                data: []
              });
            }
            for (const topic of data.data) {
              remainingItems = params.allOutcomes.map((outcome,index) => { //System to make series with same length
                return {
                  code: outcome.code,
                  position: index
                }
              });
              for (const outcome of topic.outcomes) {
                outcomePos = params.allOutcomes.findIndex(oc => oc.code == outcome.code);
                if (outcomePos != -1) {
                  convertedData[outcomePos].data.push(outcome.students);
                  remainingItems = remainingItems.filter(oc => oc.code != outcome.code);
                }
              }
              for (const outcome of remainingItems) {
                convertedData[outcome.position].data.push(0);
              }
            }
            break;
        case 3:
          for (const topic of data.data) {
            categories.push(topic._id);
          }
          convertedData = {
            categories: categories,
            maxY: Math.max(...data.data.map(o => o.outcomes.reduce((a, b) => {return a + b.students}, 0)))
          }
          break;
      }
      break;
    case "4":
      switch (type) {
        case 0:
          for (const rowData of data.data) {
            convertedData.push([rowData._id,getLearningLevel(rowData)]);
          }
          break;
        case 2:
          convertedData = [{
            name: "Learning level",
            data: []
          }]
          for (const rowData of data.data) {
            convertedData[0].data.push(fixedFloatOrInt(getLearningLevel(rowData)));
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
    case "5":
      switch (type) {
        case 0:
          for (const rowData of data.data) {
            convertedData.push([rowData._id,getPartecipationLevel(rowData,params.totalStudents)]);
          }
          break;
        case 2:
          convertedData = [{
            name: "Partecipation level",
            data: []
          }]
          for (const rowData of data.data) {
            convertedData[0].data.push(fixedFloatOrInt(getPartecipationLevel(rowData,params.totalStudents)));
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