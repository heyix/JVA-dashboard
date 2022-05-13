//Use the anchorid/extentid to find the whole first selected word
function selectFirst(getString, str, offset) {
  (len = str.length), (a = b = offset);
  if (getString[0] == " ") {
    a++;
    b++;
  }
  while (str[a] != " " && a--) {}
  if (str[a] == " ") a++; // start of word
  while (str[b] != " " && b++ < len) {} // end of word+1
  var startStr = str.substring(a, b);
  return startStr;
}

//Use the extentid/anchorid to find the whole last selected word
function selectLast(getString, str2, offset) {
  (endLen = str2.length), (enda = endb = offset - 1);
  while (str2[enda] == " " && a != 1) enda--;
  while (str2[endb] == " ") endb--;
  while (str2[enda] != " " && enda--) {}
  if (str2[enda] == " ") enda++; // start of word
  while (str2[endb] != " " && endb++ < endLen) {} // end of word+1
  return str2.substring(enda, endb);
}

//Display all transcript paragraphs
function display(transcriptDiv, video, sentences) {
  for (var i = 0; i < sentences.length; i++) {
    var sentence = sentences[i]["alternatives"][0]["transcript"];
    var startTime = sentences[i]["alternatives"][0]["words"][0]["startTime"];
    var clickableTransText =
      "<li class='text' id=" + i + ">" + sentence + "</li>";
    transcriptDiv.innerHTML += clickableTransText;
  }
}

//find the start time of given word by iterating in the words list
function getStartTime(startWords, startStr) {
  var startTime;
  for (var i = 0; i < startWords.length; i++) {
    if (startWords[i]["word"] == startStr) {
      startTime = parseFloat(startWords[i]["startTime"]);
      break;
    }
  }
  return startTime;
}

//find the end time of given word by iterating in the word list
function getEndTime(endWords, nodeValue, endString) {
  var endTime;
  if (nodeValue == null) {
    endTime = parseFloat(endWords[endWords.length - 1]["endTime"]);
    endTime = parseInt(endTime) + 1;
  } else {
    for (var i = 0; i < endWords.length; i++) {
      if (endWords[i]["word"] == endString) {
        endTime = parseFloat(endWords[i]["endTime"]);
        endTime = parseInt(endTime) + 1;
        break;
      }
    }
  }
  return endTime;
}

//Highlight the given text by adding a div around the text
function highlightSelection(userSelection, id) {
  var newNode = document.createElement("div");
  newNode.setAttribute("style", "background-color: yellow; display: inline;");
  newNode.setAttribute("id", "text" + id);
  userSelection.surroundContents(newNode);
  return userSelection.toString();
}

//Auto grow the height of comment box
function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

//When click on outside the transcript area, move back the box
function moveBack(coComment, event) {
  const withinBoundaries = event.composedPath().includes(coComment);
  if (!withinBoundaries && coComment.hasClass("moved")) {
    moveRight(coComment);
  }
}

//Move right the box
function moveRight(element) {
  element
    .css({ right: "0px", left: "" })
    .animate({ marginLeft: "+=30px" }, "slow");
  element.removeClass("moved");
}

//Moved back all comment box belong to all other highlight text
function moveLeft(coComment) {
  $(".comment")
    .not(coComment)
    .each(function () {
      var thisObj = $(this);
      if (thisObj.hasClass("moved")) {
        moveRight(thisObj);
      }
    });

  if (!coComment.hasClass("moved")) {
    coComment
      .css({ right: "0px", left: "" })
      .animate({ marginLeft: "-=30px" }, "slow");
    coComment.addClass("moved");
  }
}
