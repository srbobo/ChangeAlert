/* 

Function removeTriggers() will automatically remove all triggers associated with the current project. This will be tied to a button in the UI
for users to remove and change triggers as they please 

*/

function changeTriggers(eventInfo){
  Logger.log("Starting changeTriggers...");
  Logger.log("Clearing current triggers");
 var triggers = ScriptApp.getProjectTriggers();
  Logger.log(triggers);
  for(i = 0; i < triggers.length; i++){
   ScriptApp.deleteTrigger(triggers[i]); 
  }

  //retreiving parameters
    var parameter = eventInfo.parameter;
  
    //storing event parameters into variables
    var UpdateInfo = parameter.UpdateBox;
    var IDdays = parameter.ID_DayBox
    var IDtime = parameter.ID_TimeBox;
    var dayCheckBox = parameter.dayCheckBox;
    var weekCheckBox = parameter.weekCheckBox;
    var UpdateMinuteBox = parameter.UpdateMinuteBox;
    var hourCheckBox = parameter.hourCheckBox;
    var minCheckBox = parameter.minCheckBox;
    
    Logger.log("IDdays: " + IDdays);
 
//error handling
    
    //IDCheckBox
    if(weekCheckBox == dayCheckBox){
      Logger.log("Error -- both ID check boxes the same");
      subject = "ACTION NEEDED || ChangeAlert || Multiple Options Selected";
      body = "Dear ChangeAlert User, \n You have either checked both the daily and weekly identification checkboxes or none of the Identification options. You may only use one at a time. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    } else if (weekCheckBox == "true"){
		 //ID Days
		if(IDdays == "" || IDtime == ""){
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body = "Dear ChangeAlert User, \n You have checked the box for weekly updates, however, have not provided the system on which day or time to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
		} else if (IDdays < 1 || IDdays > 7){
		  Logger.log("Error -- IDdays out of bounds");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = "Dear ChangeAlert User, \n The value you added indicating the day of the week is invalid. Please enter a number from 1<sunday> to 7<Saturday> and resubmit. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
        } else if(IDtime < 0 || IDtime > 23){
          Logger.log("Error -- IDtime box out of bounds");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = "Dear ChangeAlert User, \n The value you added indicating the time at which to check for files is invalid. Please enter a number from 0<midnight> to 23<11pm> and resubmit. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
        } else {
		 Logger.log("No errors in ID_Day parameter"); 
		}
	} else if (dayCheckBox == "true"){
		if(IDtime == ""){
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body =  "Dear ChangeAlert User, \n You have checked the box for daily updates, however, have not provided the system at which time to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
		}
	} else {
		Logger.log("NO ID parameter errors found");
	}

    //UpdateCheckBox
    if(hourCheckBox == minCheckBox){
      Logger.log("Error -- both Update check boxes the same");
      subject = "ACTION NEEDED || ChangeAlert || Multiple Options Selected";
      body = "Dear ChangeAlert User, \n you have either checked both the By Minutes and Hourly identification checkboxes or none of the Identification options. You may only use one at a time. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    } else if (hourCheckBox == "true"){
		//Update Info
		if(UpdateInfo != 1){ 
		  
		  if(UpdateInfo < 1 || UpdateInfo >12){
		  Logger.log("Error -- UpdateInfo < 1 or > 12");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = 'Dear ChangeAlert User, \n you have entered an invalid value for "Check for updates every __ hour(s)," please enter an even value between 1 and 12 or 1. \n \n Thank you for your help. \n \n Sincerely, \n \n The ChangeAlert Team';
		  MailApp.sendEmail(user, subject, body);
		  return;
		  } else if(UpdateInfo % 2 != 0) {      
		  Logger.log("Error -- UpdateInfo not multiple of 2");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = 'Dear ChangeAlert User, you have entered an invalid value for "Check for updates every __ hour(s)," please enter an even value between 1 and 12 or 1. Thank you for your help. Sincerely, The ChangeAlert Team';
		  MailApp.sendEmail(user, subject, body);
		  return;
		  } else{
		   Logger.log("No error found on Update Hour parameter"); 
		  }
		} else if (UpdateInfo == ""){
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body =  "Dear ChangeAlert User, \n You have checked the box for hourly updates, however, have not provided the system at how many minutes to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  return;
			
		} else {
			Logger.log("No errors found in Update Minute Parameters");
		}
		
	} else if (minCheckBox == "true"){
		//Update Minute Box
		if(UpdateMinuteBox != 1 && UpdateMinuteBox != 5 && UpdateMinuteBox != 10 && UpdateMinuteBox != 15 && UpdateMinuteBox != 30){
		  Logger.log("Error -- UpdateMinuteBox parameter invalid");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = 'Dear ChangeAlert User, \n you have entered an invalid value for "Check for updates every __ minute(s)," please enter either 1, 5, 10, 15, or 30 and resubmit the form. \n \n Thank you for your help. \n \n Sincerely, \n \n The ChangeAlert Team';
		  MailApp.sendEmail(user, subject, body);
		} else if (UpdateMinuteBox == "") {
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body =  "Dear ChangeAlert User, \n You have checked the box for By Minute updates, however, have not provided the system at which time to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  return;
		} else {
			Logger.log("No errors found in Update minute parameters");
		}
    
	} else {
		Logger.log("No errors found in ANY UPDATE parameter");
	}


  //creating triggers
    if(minCheckBox == "true"){
      createUpdateMinuteTrigger(UpdateMinuteBox); 
    } else if (hourCheckBox == "true"){
      createUpdateTrigger(UpdateInfo);
    } else {
      Logger.log("Error -- cant create ID trigger");
      subject = "ACTION NEEDED || ChangeAlert || Trigger Creation Fail";
      body = "Dear ChangeAlert User, \n An error has occurred while creating your Update trigger. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    }
    
    if(dayCheckBox == "true"){
      createID_dayTrigger(IDtime);
    } else if(weekCheckBox == "true"){
     createID_weekTrigger(IDdays, IDtime);
    } else {
      Logger.log("Error -- cant create ID trigger");
      subject = "ACTION NEEDED || ChangeAlert || Trigger Creation Fail";
      body = "Dear ChangeAlert User, \n An error has occurred while creating your Identification trigger. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    }
  
    //alerting the user of installation
    var recipient = Session.getActiveUser().getEmail();
    var subject = "ChangeAlert settings have been modified successfully";
    var body = "Dear ChangeAlert User, \n Your settings have been changes successfully. Please close the form in your browser and enjoy! \n \n Thank you very much. \n \n Sincerely, \n \n THe ChangeAlert Team";
    MailApp.sendEmail(recipient, subject, body)
  
}


/* Function CheckUpdate takes an array of the user's starred files and their respective last udated dates and checks to see if the dates have changed.
   If the dates have changed, the script will log that to the Logger
*/

function CheckUpdate(){
  
  //logging start of method
  Logger.log("starting CheckUpdate()");
  
  //declaring variables
  var user = Session.getEffectiveUser(); //returns email address
  var log = setUp(-1); //returns the Spreadsheet Object of the log
  var files, curDate, name, file, prevDate;
  var numFiles = log.getActiveSheet().getLastRow();
  
  //looping through starred files recorded on the log to check if they were updated
  for(i = 2; i <= numFiles; i++){
   
   //getting information from spreadsheet
   name = log.getActiveSheet().getRange(i, 1).getValue();
   prevDate = log.getActiveSheet().getRange(i, 2).getValue();
   
   //getting current date
   files = DriveApp.getFilesByName(name);
    if(files.hasNext() == false){
     Logger.log("File missing from spreadsheet log");
      IDfiles();
      return;
    }
   file = files.next();
   curDate = file.getLastUpdated();
   curDate = curDate.toString();

      //send an email to the user if the file has been updated
      //then overwrites the old date in the log to record the changes
      //email will be received in the user's gmail from themselves
      if(prevDate != curDate){
        Logger.log("Update Found for " + name + " ...Sending Email");
        MailApp.sendEmail(user, name + " has been modified", "A collaborator has modified " + name + " please check your Drive for changes.");
        log.getActiveSheet().getRange(i, 2).setValue(curDate);
      } else {
        Logger.log(name + " Not Updated"); 
      }
    }
  
  //logging and returning the method
  Logger.log("returning CheckUpdates()");
  return;
  
 }

/* Function IDfiles() will iterate through the files in a users Drive Account and find the files which have been starred.
   When the script finds a starred file, it will record the date which it was last modified and its file ID
*/

function IDfiles(){
  
  //Logging start of method
  Logger.log("running IDfiles()");  
  
  //delcaring variables
  var log = setUp(-1) //return log Spreadsheet Object
  
  var user_files = DriveApp.getFiles(); //returns a FileIterator Object
  var file, lastRow, date, fileName, count, lastCol;
  
  //nested loops to clear the contents of the log for re-population
  lastRow = log.getActiveSheet().getLastRow();
  lastCol = log.getActiveSheet().getLastColumn();
  for(i = 2; i <= lastRow; i++){
    for(j = 1; j <= lastCol; j++){
     log.getActiveSheet().getRange(i,j).clear(); 
    }
  }
    
  //while loop will iterate through user files and check to see if the document is starrted.
  //if true, record the file information in the log
  while(user_files.hasNext()){
    
    file = user_files.next(); //receives the next file found by the fileIterator
    
    if(file.isStarred()){
      //pull file and spreadsheet information
      lastRow = log.getLastRow() + 1;
      date = file.getLastUpdated();
      date = date.toString();
      fileName = file.getName();
      
      //write in log spreadsheet
      log.getActiveSheet().getRange(lastRow,2).setValue(date);
      log.getActiveSheet().getRange(lastRow, 1).setValue(fileName);
      
    }
  }  
  
  //logging and returning method
  Logger.log("returning IDfiles()");
  return;
  
  
}

/* Function setUp() will check to see if the log file has been created on the users drive
   if the file is found, the function returns the spreadsheet object
   if the file is not found, the log is constructed on the users drive and set up the header cells
   then returns the Spreadsheet object to the user
*/

function setUp(eventInfo) {
  
  //retreiving the UI
  var app = UiApp.getActiveApplication();
 
  //logging start of method
  Logger.log("Starting setUp()");
  Logger.log("eventInfo: " + eventInfo);
  
  //declaring and initializing variables
  var user = Session.getActiveUser().getEmail();
  Logger.log("User: " + user);
  var files = DriveApp.getFilesByName("ChangeAlert_Log"); //returns a fileIterator Object
  var log, body, subject;
  
  if(eventInfo != -1){
    
    //retreiving parameters
    var parameter = eventInfo.parameter;
  
    //storing event parameters into variables
    var UpdateInfo = parameter.UpdateBox;
    var IDdays = parameter.ID_DayBox
    var IDtime = parameter.ID_TimeBox;
    var dayCheckBox = parameter.dayCheckBox;
    var weekCheckBox = parameter.weekCheckBox;
    var UpdateMinuteBox = parameter.UpdateMinuteBox;
    var hourCheckBox = parameter.hourCheckBox;
    var minCheckBox = parameter.minCheckBox;
    
    Logger.log("IDdays: " + IDdays);
    
//error handling
    
    //IDCheckBox
    if(weekCheckBox == dayCheckBox){
      Logger.log("Error -- both ID check boxes the same");
      subject = "ACTION NEEDED || ChangeAlert || Multiple Options Selected";
      body = "Dear ChangeAlert User, \n You have either checked both the daily and weekly identification checkboxes or none of the Identification options. You may only use one at a time. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    } else if (weekCheckBox == "true"){
		 //ID Days
		if(IDdays == "" || IDtime == ""){
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body = "Dear ChangeAlert User, \n You have checked the box for weekly updates, however, have not provided the system on which day or time to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
		} else if (IDdays < 1 || IDdays > 7){
		  Logger.log("Error -- IDdays out of bounds");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = "Dear ChangeAlert User, \n The value you added indicating the day of the week is invalid. Please enter a number from 1<sunday> to 7<Saturday> and resubmit. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
        } else if(IDtime < 0 || IDtime > 23){
          Logger.log("Error -- IDtime box out of bounds");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = "Dear ChangeAlert User, \n The value you added indicating the time at which to check for files is invalid. Please enter a number from 0<midnight> to 23<11pm> and resubmit. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
        } else {
		 Logger.log("No errors in ID_Day parameter"); 
		}
	} else if (dayCheckBox == "true"){
		if(IDtime == ""){
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body =  "Dear ChangeAlert User, \n You have checked the box for daily updates, however, have not provided the system at which time to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  MailApp.sendEmail(user, subject, body);
          return;
		}
	} else {
		Logger.log("NO ID parameter errors found");
	}
    
    //UpdateCheckBox
    if(hourCheckBox == minCheckBox){
      Logger.log("Error -- both Update check boxes the same");
      subject = "ACTION NEEDED || ChangeAlert || Multiple Options Selected";
      body = "Dear ChangeAlert User, \n you have either checked both the By Minutes and Hourly identification checkboxes or none of the Identification options. You may only use one at a time. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    } else if (hourCheckBox == "true"){
		//Update Info
		if(UpdateInfo != 1){ 
		  
		  if(UpdateInfo < 1 || UpdateInfo >12){
		  Logger.log("Error -- UpdateInfo < 1 or > 12");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = 'Dear ChangeAlert User, \n you have entered an invalid value for "Check for updates every __ hour(s)," please enter an even value between 1 and 12 or 1. \n \n Thank you for your help. \n \n Sincerely, \n \n The ChangeAlert Team';
		  MailApp.sendEmail(user, subject, body);
		  return;
		  } else if(UpdateInfo % 2 != 0) {      
		  Logger.log("Error -- UpdateInfo not multiple of 2");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = 'Dear ChangeAlert User, you have entered an invalid value for "Check for updates every __ hour(s)," please enter an even value between 1 and 12 or 1. Thank you for your help. Sincerely, The ChangeAlert Team';
		  MailApp.sendEmail(user, subject, body);
		  return;
		  } else{
		   Logger.log("No error found on Update Hour parameter"); 
		  }
		} else if (UpdateInfo == ""){
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body =  "Dear ChangeAlert User, \n You have checked the box for hourly updates, however, have not provided the system at how many minutes to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  return;
			
		} else {
			Logger.log("No errors found in Update Minute Parameters");
		}
		
	} else if (minCheckBox == "true"){
		//Update Minute Box
		if(UpdateMinuteBox != 1 && UpdateMinuteBox != 5 && UpdateMinuteBox != 10 && UpdateMinuteBox != 15 && UpdateMinuteBox != 30){
		  Logger.log("Error -- UpdateMinuteBox parameter invalid");
		  subject = "ACTION NEEDED || ChangeAlert || Trigger Value Invalid";
		  body = 'Dear ChangeAlert User, \n you have entered an invalid value for "Check for updates every __ minute(s)," please enter either 1, 5, 10, 15, or 30 and resubmit the form. \n \n Thank you for your help. \n \n Sincerely, \n \n The ChangeAlert Team';
		  MailApp.sendEmail(user, subject, body);
		} else if (UpdateMinuteBox == "") {
		  Logger.log("Error -- Missing Information");
		  subject = "ACTION NEEDED || ChangeAlert || Missing Information";
		  body =  "Dear ChangeAlert User, \n You have checked the box for By Minute updates, however, have not provided the system at which time to check. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
		  return;
		} else {
			Logger.log("No errors found in Update minute parameters");
		}
    
	} else {
		Logger.log("No errors found in ANY UPDATE parameter");
	}

    //creating log spreadsheet in user's drive and returning spreadsheet object
    Logger.log("creating log file now...");
    log = SpreadsheetApp.create("ChangeAlert_Log");
    log.getActiveSheet().getRange(1, 1).setValue("file_names");
    log.getActiveSheet().getRange(1, 2).setValue("file_dates");
    
    //setting sheet protection
    log.getActiveSheet().getSheetProtection().setProtected(true);
    
    //creating triggers
    if(minCheckBox == "true"){
      createUpdateMinuteTrigger(UpdateMinuteBox); 
    } else if (hourCheckBox == "true"){
      createUpdateTrigger(UpdateInfo);
    } else {
      Logger.log("Error -- cant create ID trigger");
      subject = "ACTION NEEDED || ChangeAlert || Trigger Creation Fail";
      body = "Dear ChangeAlert User, \n An error has occurred while creating your Update trigger. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    }
    
    if(dayCheckBox == "true"){
      createID_dayTrigger(IDtime);
    } else if(weekCheckBox == "true"){
     createID_weekTrigger(IDdays, IDtime);
    } else {
      Logger.log("Error -- cant create ID trigger");
      subject = "ACTION NEEDED || ChangeAlert || Trigger Creation Fail";
      body = "Dear ChangeAlert User, \n An error has occurred while creating your Identification trigger. Please resubmit the form. \n \n Thank you very much. \n \n Sincerely, \n \n The ChangeAlert Team";
      MailApp.sendEmail(user, subject, body);
      return;
    }
       
    //closing the app
    Logger.log("Closing UI...");
    app.close();
    
    //Running IDfiles()
    //IDfiles();
    
    //alerting the user of installation
    var recipient = Session.getActiveUser().getEmail();
    var subject = "ChangeAlert has been installed";
    var body = "Thank you for installing ChangeAlert. Your application is currently working on your Drive. You may now close the window. \n \n Sincerely, \n \n The Change Alert Team";
    MailApp.sendEmail(recipient, subject, body)
    
    //returning log
    return log;
    
  } else{
    //finding and returning spreadsheet file
    Logger.log("Found Log...trying to open");
    
    if(files.hasNext() == false){
      Logger.log("Log File was deleted");
      var recipient = Session.getActiveUser().getEmail();
      var subject = "ACTION NEEDED || Log File was Deleted";
      var body = "Dear ChangeAlert User, \n We have noticed that the log file was deleted in your Drive. Please open the application and resubmit the form. \n \n Sincerely, \n \n The Change Alert Team";
      MailApp.sendEmail(recipient, subject, body);
      return;
    }
    
    var logFile = files.next();
    var url = logFile.getUrl();
    log = SpreadsheetApp.openByUrl(url);
    Logger.log("returning setUp()");
      
     //closing the app
     Logger.log("Closing UI...");
     app.close();
    
    return log;
  }
}

/*
The functions below set up triggers for the CheckUpdate() and IDfiles() methods
and will be called in the setUp function if the log spreadsheet is not made
*/

function createUpdateTrigger(UserInput){
  
  //logging start of method
  Logger.log("Creating Update Hour Trigger...");
  
  //creating Trigger
  var Update = ScriptApp.newTrigger("CheckUpdate")
   .timeBased()
   .everyHours(UserInput)
   .create()

  //returning method
  return;
}

function createUpdateMinuteTrigger(UserInput){
 
  //logging start of method
  Logger.log("Creating Update Minute Trigger...");
  
  //creating Trigger
  var Update = ScriptApp.newTrigger("CheckUpdate")
  .timeBased()
  .everyMinutes(UserInput)
  .create()
  
  //returning Method
  return;
}

function createID_dayTrigger(time) {
  
  //logging start of method
  Logger.log("Creating ID Day Trigger...");
  
  //creating Trigger
  var ID = ScriptApp.newTrigger("IDfiles")
   .timeBased()
   .everyDays(1)
   .atHour(time)
   .create()

  //returning method
  return;
}

function createID_weekTrigger(day, time){
  
  //logging start of method
  Logger.log("Creating ID Week Trigger...");
  
   //selecting the day
  switch(day){
    case "1":
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .create()
      break;
    case "2":
      Logger.log("case found");
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .create()
      break;
    case "3":
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.TUESDAY);
      break;
    case "4":
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.WEDNESDAY)
      .create()
      break;
    case "5":
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.THURSDAY)
      .create()
      break;
    case "6":
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.FRIDAY);
      break;
    case "7":
      var ID = ScriptApp.newTrigger("IDfiles")
      .timeBased()
      .everyWeeks(1)
      .atHour(time)
      .onWeekDay(ScriptApp.WeekDay.SATURDAY)
      .create()
      break;
    default:
      Logger.log("switch block defaulted");
  }

  //returning method
  return;
  
}


function doGet() {
  
  //Creating the UiInstance Object
  var app = UiApp.createApplication().setTitle("ChangeAlert");
  
  //creating the border frame for the html element
  var mainFrame = app.createVerticalPanel()
                     .setBorderWidth(2)
                     .setStyleAttribute("borderColor","black")
                     .setStyleAttribute("backgroundColor", "#008AE6")
                     .setStyleAttribute("opacity", .75)
                     .setStyleAttribute("padding", 10)
                     
  app.add(mainFrame);
  
  //Creating welcome message and frame
  var WelcomeMessage = app.createLabel("Welcome to ChangeAlert! ", true)
                          .setStyleAttribute("fontFamily", "cursive")
                          .setStyleAttribute("fontSize", 25)
                          .setStyleAttribute("fontWeight", "bold")
                          .setStyleAttribute("color", "white")
                          .setStyleAttribute("textAlign", "center")
  
  var WelcomeSecondary = app.createLabel("Please select your preferences. When you are done, click the button below to install. \n You will receive an email upon completion prompting you to close this tab.", true)
                            .setStyleAttribute("fontFamily", "cursive")
                            .setStyleAttribute("fontSize", 15)
                            .setStyleAttribute("fontWeight", 5)
                            .setStyleAttribute("color", "white")
                            .setStyleAttribute("textAlign", "center")
                            .setStyleAttribute("padding", 5)
  
  var WelcomeFrame = app.createVerticalPanel()
      .setBorderWidth(2)
      .setStyleAttribute("backgroundColor", "blue")
      .add(WelcomeMessage)
      .add(WelcomeSecondary)
  mainFrame.add(WelcomeFrame);
  
  //creating the framework that will house the user input and main form
  var SelectionFrame = app.createVerticalPanel()
  
  //Setting up ID section of the UI
       
       //Lables 
       var IDlable = app.createLabel("Identifying Starred Files",true)
                        .setStyleAttribute("fontWeight", "bold")
                        .setStyleAttribute("fontSize", 15)
       
       var IDSecondaryLable = app.createLabel("How often would you like ChangeAlert to search Google Drive for new starred files (chose one - then populate approproate box(s))?",true)
                                 .setStyleAttribute("padding", 2)   
  
       var ID_DayLable = app.createLabel("Every <day of the week>?", true)
                             .setStyleAttribute("padding", 7)
       var ID_TimeLable = app.createLabel("At what time? (Please use 24hr scale)", true)
                             .setStyleAttribute("padding", 7)
       
       var ID_NoteLable = app.createLabel("* Please input an integer from 1 <Sunday> to 7 <Saturday>")
                             .setStyleAttribute("fontSize",10)
       
       //checkBoxes
       var dayCheckBox = app.createCheckBox("Daily")
                            .setName("dayCheckBox")
       var weekCheckBox = app.createCheckBox("Weekly")
                             .setName("weekCheckBox")
  
       //TextBoxes
       var ID_DayBox = app.createTextBox()
                          .setMaxLength(1)
                          .setWidth(25)
                          .setName("ID_DayBox")
                          
  
       var ID_TimeBox = app.createTextBox()
                           .setMaxLength(2)
                           .setWidth(25)
                           .setName("ID_TimeBox")
                           
       
       //Framework
       var IDLableFrame = app.createVerticalPanel()
                             .add(dayCheckBox)
                             .add(weekCheckBox)
                             .add(ID_DayLable)
                             .add(ID_NoteLable)
                             .add(ID_TimeLable)
                             
       
       var IDInputFrame = app.createVerticalPanel()
                             .add(ID_DayBox)
                             .add(ID_TimeBox)
                             .setStyleAttribute("paddingLeft", 100)
                             .setStyleAttribute("paddingTop", 40)
                                                 
       var ID_ContentFrame = app.createHorizontalPanel() 
                                .add(IDLableFrame)
                                .add(IDInputFrame)
       
       var ID_Frame = app.createVerticalPanel()
                         .add(IDlable)
                         .add(IDSecondaryLable)
                         .add(ID_ContentFrame)
                         .setStyleAttribute("padding",5)
                               
       SelectionFrame.add(ID_Frame);
       
  //Setting up the Update section of the UI
  
       //creating Lables
             var UpdateLable = app.createLabel("Checking for file updates", true)
                                  .setStyleAttribute("fontWeight", "bold")
                                  .setStyleAttribute("fontSize", 15)
             
             var UpdateSecondaryLable = app.createLabel("How often would you like ChangeAlert to check for updates on your starred documents and notify you if changes exist (chose one - then populate appropriate box(s))?",true)
                                           .setStyleAttribute("padding", 2)
  
             var Update_DayLable = app.createLabel("Check for updates every __ hour(s)", true)
                                      .setStyleAttribute("padding", 7) 
   
             var Update_noteLable = app.createLabel("* Please enter 1 or an even number between 2 and 12", true)
                                       .setStyleAttribute("fontSize", 10)
             
             var UpdateMinuteLabel = app.createLabel("Check for updates every __ minute(s)")
                                        .setStyleAttribute("padding", 7)
             
             var UpdateMinuteNote = app.createLabel("* Options: 1, 5, 10, 15, 30 minute(s)")
                                       .setStyleAttribute("fontSize", 10)
             
       //creating textboxes
  
             var UpdateBox = app.createTextBox()
                                .setMaxLength(2)
                                .setWidth(25)
                                .setName("UpdateBox")
             
             var UpdateMinuteBox = app.createTextBox()
                                      .setMaxLength(2)
                                      .setWidth(25)
                                      .setName("UpdateMinuteBox")
       
       //checkBoxes
       var hourCheckBox = app.createCheckBox("Hourly")
                            .setName("hourCheckBox")
       var minCheckBox = app.createCheckBox("By Minutes")
                             .setName("minCheckBox")      
       
       //creating the framework
             
              var UpdateLableFrame = app.createVerticalPanel()
                                        .add(hourCheckBox)
                                        .add(minCheckBox)
                                        .add(Update_DayLable)
                                        .add(Update_noteLable)
                                        .add(UpdateMinuteLabel)
                                        .add(UpdateMinuteNote)
              var UpdateInputFrame = app.createVerticalPanel()
                                        .add(UpdateBox)
                                        .add(UpdateMinuteBox)
                                        .setStyleAttribute("paddingLeft", 125)
                                        .setStyleAttribute("paddingTop", 50)
              
              var UpdateContentFrame = app.createHorizontalPanel()
                                          .add(UpdateLableFrame)
                                          .add(UpdateInputFrame)
              
              var UpdateFrame = app.createVerticalPanel()
                                   .add(UpdateLable)
                                   .add(UpdateSecondaryLable)
                                   .add(UpdateContentFrame)
                                   .setStyleAttribute("padding",5)
                                               
              SelectionFrame.add(UpdateFrame);
  
  //adding selectionFrame to the UI
  mainFrame.add(SelectionFrame);

   //Creating the button UI 
          
  
          //Creating the handler function for the button when pressed
          //Button should serve to start the setUp() method and "install" the app to the users Drive
          var handler = app.createServerHandler("setUp")
                           .addCallbackElement(ID_DayBox)
                           .addCallbackElement(ID_TimeBox)
                           .addCallbackElement(UpdateBox)
                           .addCallbackElement(dayCheckBox)
                           .addCallbackElement(weekCheckBox)
                           .addCallbackElement(UpdateMinuteBox)
                           .addCallbackElement(hourCheckBox)
                           .addCallbackElement(minCheckBox)
          
          //Creating the button which will install the App
          var button = app.createButton()
                          .setPixelSize(75, 25)
                          .setText("Submit")
               
          button.addClickHandler(handler);
  
          var ButtonNote = app.createLabel("* Upon pressing 'Submit' you will receive an email notification from yourself indicating if the set up is complete or if any errors have occurred with additional instructions", true)
                              .setStyleAttribute("fontSize", 9);
  
  
          //creating the changeSettings button
          var changeButton = app.createButton()
             .setPixelSize(125, 25)
             .setText("Change Settings")
          
          //creating the changeSetting click handler
          var ChangeHandler = app.createServerHandler("changeTriggers")
                           .addCallbackElement(ID_DayBox)
                           .addCallbackElement(ID_TimeBox)
                           .addCallbackElement(UpdateBox)
                           .addCallbackElement(dayCheckBox)
                           .addCallbackElement(weekCheckBox)
                           .addCallbackElement(UpdateMinuteBox)
                           .addCallbackElement(hourCheckBox)
                           .addCallbackElement(minCheckBox)
          changeButton.addClickHandler(ChangeHandler);
          
               
          //creating the button frame
          var ButtonFrame = app.createHorizontalPanel()
                               .add(button)
                               .add(changeButton)
                              
          
          //adding to the main UI
          mainFrame.add(ButtonFrame)

  
  //retutning app
  return app;
  
}
