var express = require("express");
require('dotenv').config(); // Load environment variables from .env file
// var mysql = require('mysql');
var mysql = require('mysql2');
var fileuploader = require("express-fileupload");
var app = express();
app.listen(process.env.PORT, function () {
    console.log("Server started on port " + process.env.PORT);
});
// middleware===============================================
app.use(express.urlencoded({ extended: true }));    
app.use(express.json());
// access to connection to database===============================================
app.use(fileuploader());  

// Database connection configuration using environment variables
var doconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
    
var docon = mysql.createConnection(doconfig);
docon.connect(function(err) {
    if (err == null)
    console.log("Connected Successfully...");
    else
    console.log(err);
});
//=============================================================================
// =============================URL Handler INdex =================================
app.use(express.static('public')); // Assuming 'dash-driver.html' is in the 'public' directory

app.get("/", function (req, resp) {
    
    resp.sendFile(process.cwd() + "/public/index_2.html");
});
app.get("/dash-driver", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/dash-driver.html");
});
app.get("/car-manager", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/car-manager.html");
});
app.get("/profile-driver", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/profile-driver.html");
});
app.get("/dash-rider", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/dash-rider.html");
});
app.get("/profile-rider", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/profile-rider.html");
});
app.get("/find_car", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/find_car.html");
});
app.get("/passanger-request", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/request-driver.html");
});
app.get("/dash-ad", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/dash-admin.html");
});
app.get("/dasha-ad", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/dash-admin.html");
});
app.get("/dashbb-ad", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/dash-admin.html");
});


 //   ===============================================driver data save=========================================
 
 app.post("/driver-profile-save-data", function (req, resp) {


    var FileName = "nopic.jpg";

    if (req.files != null) {
        FileName = req.files.photo.name;
        var path = process.cwd() + "/public/upload/" + FileName;
        req.files.photo.mv(path);
    } 
    var Emailid = req.body.inputEmail4;
    var name = req.body.inputname;
    var contact = req.body.inputcontact;
    var address = req.body.inputAddress;
    var citynm = req.body.inpcity;
    var id = req.body.id_proof;

    console.log(req.body);
    // console.log(req.body);
    // resp.send("   File name=" + FileName);
    // resp.send(emailid);

    docon.query("INSERT INTO  prodriver(emailid,name,contact,address, citynm,photonm ,idproof) VALUES (?,?,?,?,?,?,?)", [Emailid, name, contact, address, citynm,FileName,id], function (err) {

        if (err == null) {
            resp.send("Record saved successfully!");
        } else {
            resp.send(err);
        }
    });
})

 //   ===============================================passanger data save=========================================
 app.post("/passanger-profile-save-data", function (req, resp) {
    var FileName = "nopic.jpg";

    if (req.files != null) {
        FileName = req.files.photo.name;
        var path = process.cwd() + "/public/upload/" + FileName;
        req.files.photo.mv(path);
    } 

    var Emailid = req.body.inputEmail4;
    var name = req.body.inputname;
    var contact = req.body.inputcontact;
    var address = req.body.inputAddress;
    var citynm = req.body.inpcity;
    var idproof = req.body.Rid;  // Assuming Rid is the ID proof field in your form

    console.log(req.body);
    // console.log(req.body);
    // resp.send("   File name=" + FileName);
    // resp.send(emailid);

    docon.query(
        "INSERT INTO customers(email, name, mobile, address, city, proof) VALUES (?,?,?,?,?,?)",
        [Emailid, name, contact, address, citynm, FileName, idproof],
        function (err) {
            if (err == null) {
                resp.send("Record saved successfully!");
            } else {
                resp.send(err);
            }
        }
    );
});



//   =============================================== driver data update=========================================

app.post("/Profile-update-data", function (req, resp) {
    var FileName = "nopic.jpg";

    if (req.files != null) {
        FileName = req.files.photo.name;
        var path = process.cwd() + "/public/upload/" + FileName;
        req.files.photo.mv(path);
    } 

    var Emailid = req.body.inputEmail4;
    var name = req.body.inputname;
    var contact = req.body.inputcontact;
    var address = req.body.inputAddress;
    var citynm = req.body.inpcity;
    var id = req.body.id_proof;

    console.log(req.body);

    docon.query(
        "UPDATE prodriver SET idproof=?, contact=?, address=?, citynm=?,  photonm=? WHERE emailid=?",
        [id, contact, address, citynm,  FileName, Emailid],
        function (err) {
            if (err == null) {
                resp.send("Record updated successfully!");  
            } else {
                resp.send(err);
            }
        }
    );
});
//   =============================================== passanger data update=========================================
app.post("/Profile-update-data-passanger-id", function (req, resp) {
    var FileName = "nopic.jpg";

    if (req.files != null) {
        FileName = req.files.photo.name;
        var path = process.cwd() + "/public/upload/" + FileName;
        req.files.photo.mv(path);
    } 

    var Emailid = req.body.inputEmail4;
    var name = req.body.inputname;
    var contact = req.body.inputcontact;
    var address = req.body.inputAddress;
    var citynm = req.body.inpcity;
    var idproof = req.body.Rid;  // Assuming Rid is the ID proof field in your form

    console.log(req.body);

    docon.query(
        "UPDATE customers SET proof=?, mobile=?, address=?, city=?, file=? WHERE email=?",
        [idproof, contact, address, citynm,  FileName, Emailid],
        function (err) {
            if (err == null) {
                resp.send("Record updated successfully!");  
            } else {
                resp.send(err);
            }
        }
    );
});


// ======================================donor file update=========================================
app.post("/addnewcar", function (req, resp) {
    var email = req.body.kuchEmail;
    var city = req.body.kuchct;
    var brand = req.body.kuchbd;
    var modal = req.body.kuchmd;
    var ctype = req.body.kuchtype;
    var fuel = req.body.kuchfl;
    var condition = req.body.kuchcond;
    
    console.log(req.body);
    docon.query("INSERT INTO avilcar ( emailid,city,brand,modal,ctype,fuel ,carcondition) VALUES (?,?,?,?,?,?,?)", [email,city,brand,modal,ctype,fuel,condition], function (err) {        

        if (err == null) {
            resp.send("Record saved successfully!");
        } else {    
            resp.send(err); 
            console.log(err);    
        }   
    })

  
  
  });
//  ========================================= angular fetch car  record data=========================================
app.get("/fetch-car-records",function(req,resp)
{   var id=req.query.eml;
  console.log(id);
         //fixed                             //same seq. as in table
         docon.query("select * from avilcar where emailid=?",[id],function(err,resultTableJSON)
    {
        console.log(resultTableJSON) ;
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

// ===============================fetch city name in find a car page ============================

// app.get("/get-citiess",function(req,resp)
// {
//          //fixed                             //same seq. as in table
//     docon.query("select distinct city from avilcar",function(err,resultTableJSON)
//     {
//       if(err==null)
//       resp.send(resultTableJSON);
//               else
//             resp.send(err);
//           })
// })
// =========================== Find distinct city from avail car ========
app.get("/find-city",function(req,resp){
    docon.query("Select distinct city from avilcar",function(err,table){
        if(err==null){
            resp.send(table);
        }
        else{
            resp.send(err);
        }
    })
})

// ===============================fetch cartype in city============================

// app.get("/get-cartype",function(req,resp)
// {
//   //fixed                             //same seq. as in table
//     docon.query("select distinct ctype from avilcar",function(err,resultTableJSON)
//     {
//           if(err==null)
//           resp.send(resultTableJSON);
//               else
//             resp.send(err);
//           })
// })   

app.get("/find-cars",function(req,resp){
    // console.log("gchvjk");
    docon.query("Select distinct ctype from avilcar",function(err,table){
        if(err==null){
            resp.send(table);
            // console.log(table);
        }
        else{
            resp.send(err);
        }
    })
})

        //  ========================================= angular fetch card of  car driver details =========================================
        // app.get("/fetch-cardriver-details",function(req,resp)
        // {    console.log(req.query);
        //   var ctype=req.query.cartypekuch;
        //   var city=req.query.cityKuch;
        
        
        //          //fixed                             //same seq. as in table
        //          docon.query("select  prodriver.name,prodriver.contact,prodriver.address,avilcar.emailid,avilcar.ctype  from prodriver inner join  avilcar on prodriver.emailid=avilcar.emailid  where avilcar.ctype=? and prodriver.citynm=?",[ctype,city],function(err,resultTableJSON)
                 
        //     {
        //         // console.log(respJSONKuch) ;
        //           if(err==null) 
        //             resp.send(resultTableJSON);
        //               else
        //             resp.send(err);
        //     })
        // })
        app.get("/find-driver",function(req,resp){
            var city=req.query.citykuch;
            var car=req.query.carkuch;
            docon.query("select prodriver.emailid,prodriver.name,prodriver.contact,avilcar.modal,avilcar.carcondition from prodriver inner join avilcar on prodriver.emailid=avilcar.emailid where city=? and ctype=?",[city,car],function(err,resultTable)
            {
                if(err==null){
                    console.log(resultTable);
                    resp.send(resultTable);
                }
          else
            resp.send(err); 
          })
    })


 // ========================= Send passengers details=====================
app.get("/booking-details",function(req,resp){
    var selRec = JSON.parse(req.query.ddata);
    var selRec2 = JSON.parse(req.query.cdata);

    var pemail =selRec.emailid;
    // ?? object ??
    // aw reha
    var pname =selRec.name;
    var pmobile =selRec.contact;
    var email=selRec2.eml;
    var name=selRec2.name;
    var number=selRec2.number;
    var add=selRec2.add;
    var date=new Date(selRec2.date);
    var time=new Date(selRec2.time);
    var src=selRec2.src;
    var des=selRec2.des;
    console.log(pemail);
    console.log(email);
    console.log(des);
    console.log(time);
    console.log(date);
    console.log(add);
    console.log(number);
    console.log(name);
    console.log(email);
    console.log(pmobile);
    console.log(pname);
     docon.query("insert into passengers(pemail,pname,pmobile,email,name,mobile,pickadd,doj,picktime,src,des,track) values(?,?,?,?,?,?,?,?,?,?,?,0)",[pemail,pname,pmobile,email,name,number,add,date,time,src,des],function(err){
        if(err==null){
            resp.send("Car Booked");
        }
        else{
            resp.send(err); 
        }
    })
})  





app.get("/Booking-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
    docon.query("select * from passengers where pemail =? && track = 0 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})






















//===========================================================================================================================
// =============================AJAX-save data=================================
// ... Existing server-side code ...

app.post("/save-data", function(req, resp) {
    var email = req.body.email;
    var password = req.body.password;
    var usertype = req.body.usertype;
    var sql = "INSERT INTO useraccount (Emailid, Password,usertype) VALUES (?,?, ?)";
    docon.query(sql, [email, password,usertype], function(err, resultJson) {
       if (err) {
            console.log("Error saving data: ", err);
            resp.send("Error saving data");
            return;
        }
        console.log("Congratulations! You're officially part of our community. Welcome aboard! ");
        resp.send("Congratulations! You're officially part of our community. Welcome aboard!");
  })  
});




// ======================login =================================
app.get("/login-data", function (req, resp) {
    docon.query("SELECT * FROM useraccount WHERE emailid=? AND password=?", [req.query.email, req.query.password], function (err, resJSON) {
        if (err) {
            resp.status(500).send(err); // Return error status and message
        } else {
            if (resJSON.length === 1) {
                if (resJSON[0].userstatus === 1) {
                    resp.send(resJSON[0].usertype);
                } else {
                    resp.send("Account Blocked");
                }
            } else {
                resp.send("Invalid Email or Password");
            }
        }
    });
  });




















//   ====================================request page ===========================================

// ========================= Pending requestes ========================== 
app.get("/Booking-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
     docon.query("select * from passengers    where pemail =? && track = 0 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})

// ========================= Accepted requestes ========================= 
app.get("/accepted-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
     docon.query("select * from passengers where pemail =? && track = 2 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ========================= completed requests ========================= 
app.get("/completed-requests",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
     docon.query("select * from passengers where pemail =? && track = 3 ",[eml],function(err,result){
        if(err==null)
        {
            console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== reject a request ============================
app.get("/reject-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
     docon.query("update passengers set track = 1 where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }   
        else{
            resp.send(err);
        }
    })
})
// ======================== Accept a request ============================
app.get("/accept-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
     docon.query("update passengers set track = 2 where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err); 
        }   
    })
})
// ======================== complete a request ==========================
app.get("/complete-car",function(req,resp){
    // console.log(req.query.email);
    var srno=req.query.Srno;
     docon.query("update passengers set track = 3 where Srno =?",[srno],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== customer pending requests ===================
app.get("/my_pending",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
     docon.query("select * from passengers where email =? && track = 0 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== customer rejected requests ==================
app.get("/my_rejected",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
     docon.query("select * from passengers where email =? && track = 1 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})
// ======================== customer accepted requests ==================
app.get("/my_accepted",function(req,resp){
    // console.log(req.query.email);
    var eml=req.query.email;
    // console.log(eml);
     docon.query("select * from passengers where email =? && track = 2 ",[eml],function(err,result){
        if(err==null)
        {
            // console.log(result);
            resp.send(result);
        }
        else{
            resp.send(err);
        }
    })
})







































// =======================================admin pannel==========================================
//  ========================================= angular fetch drivers  data=========================================
app.get("/fetch-driver-angular-json-data",function(req,resp)
{
         //fixed                             //same seq. as in table
         docon.query("select * from prodriver ",function(err,resultTableJSON)
    {
        // console.log(respJSONKuch) ;
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})
//  ========================================= angular fetch needy  data=========================================
app.get("/fetch-passangers-angular-json-data",function(req,resp)
{
         //fixed                             //same seq. as in table
         docon.query("select * from passengers ",function(err,resultTableJSON)
    {
        // console.log(respJSONKuch) ;
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

//  ========================================= angular fetch data=========================================
app.get("/fetch-angular-json-data",function(req,resp)
{
         //fixed                             //same seq. as in table
         docon.query("select * from useraccount ",function(err,resultTableJSON)
    {
        // console.log(respJSONKuch) ;
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

// =============angular delete userid===================
app.get("/delete-userid-angular",function(req,resp)
{
     //saving data in table
    var email=req.query.emailkuch;
    

         //fixed                             //same seq. as in table
    docon.query("delete from useraccount where emailid=?",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("Account Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})
// =============angular blocked  userid===================

app.get("/block-userid-angular",function(req,resp)
{
     //saving data in table
    var email=req.query.emailkuch;
    

         //fixed                             //same seq. as in table
    docon.query("update  useraccount set userstatus=0 where emailid=? ",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)

            resp.send("User Blocked Successfully!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})
// =============angular blocked  userid===================
app.get("/unblock-userid-angular",function(req,resp)
{
     //saving data in table
    var email=req.query.emailkuch;
    

         //fixed                             //same seq. as in table
    docon.query("update  useraccount set userstatus=1 where emailid=? ",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)

            resp.send("User unBlocked Successfully!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})



app.get("/delete-car-record-angular",function(req,resp)
{
     //saving data in table
    var serialno=req.query.srno;
    console.log(serialno);

         //fixed                             //same seq. as in table
    docon.query("delete from avilcar where srno=?",[serialno],function(err,result)
    {   
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("Car Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})





// -----------------------------------------search-data-prodriver-JSOOOOOOOOOOOOONNNNNNNNN------------------------------------------------------------
app.get("/get-json-record", function (req, resp) {
    // console.log(req.query);
    // Parameter should be 'kuchEmail' instead of 'req.query.kuchEmail'
    docon.query("select * from prodriver where emailid=?", [req.query.kuchEmail], function (err, resultTableJSON) {
        if (err == null) {
            resp.send(resultTableJSON);
        } else {
            resp.send(err);
        }
    });
  });
  // -----------------------------------------search-data-rider-JSOOOOOOOOOOOOONNNNNNNNN------------------------------------------------------------
  app.get("/get-json-record-rider", function(req, resp) {
    const email = req.query.kuchEmail;
console.log("email");
    docon.query("SELECT * FROM customers  WHERE email = ?", [email], function(err, resultTableJSON) {
        if (err === null) {
            resp.send(resultTableJSON);
        } else {
            console.error(err); 
            resp.status(500).send("Internal Server Error");
        }
    });
});
