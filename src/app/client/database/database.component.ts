import { Component, OnInit, AfterViewInit,Input } from "@angular/core";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { HttpClient, JsonpClientBackend } from '@angular/common/http';

import { Observable } from "rxjs";
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { jsPlumb } from "jsplumb";
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit ,AfterViewInit{
  projectdb: FormGroup;
  tables: string = "";
  attributes: string = "";
  SERVER_URL = "http://localhost:3030/api/testjson/test";
  jsPlumbInstance;
i;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    //this.prototype();
  //this.fillFromJson2();
    this.fillFromJson();
  }

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.jsPlumbInstance.Defaults.Container = ("container");
    this.jsPlumbInstance.Defaults.EndpointStyle = { radius: 7, fillStyle: "#F09E30" };

    this.jsPlumbInstance.reset();
    this.jsPlumbInstance.importDefaults({
      ConnectionsDetachable: false,
      ReattachConnections: true
    });

    /*
    this part somehow saved the issue of endpoints weird connections
    */
    const conn = this.jsPlumbInstance.connect({ source: "form", target: "form" });
    this.jsPlumbInstance.deleteConnection(conn);
    /*
    this part somehow saved the issue of endpoints weird connections
    */

    this.init();


    //Binds

    setTimeout(() =>
      this.jsPlumbInstance.bind("connection", conn => {

        const control1 = <FormArray>this.projectdb.get("connections");
        const s = conn.source.children[1].firstChild.value;
        const t = conn.target.children[1].firstChild.value;
        const sparent = conn.source.parentNode.parentNode.children[0].children[0].value;
        const tparent = conn.target.parentNode.parentNode.children[0].children[0].value;
        const spid = conn.source.offsetParent.id
        const tpid = conn.target.offsetParent.id

          control1.push(this.initConnections(conn.sourceId, conn.targetId,sparent, tparent));

      }), 0);




  }


  fillFromJson2() {

    this.httpClient.get<any>(this.SERVER_URL).subscribe(

      res => {
    console.log(res.tables)
    const json = ` {
      "dbName": "node",
      "dbType": "MySql",
      "tables": [
        {
          "id": "45ff61",
          "name": "user",
          "x": 58,
          "y": 681,
          "columns": [
            {
              "id": "8e2118",
              "name": "id",
              "datatype": "INT",
              "primaryKey": true
            },
            {
              "id": "9961e9",
              "name": "username",
              "datatype": "VARCHAR",
              "primaryKey": ""
            },
            {
              "id": "5bbc7f",
              "name": "phone",
              "datatype": "INT",
              "primaryKey": ""
            }
          ]
        },
        {
          "id": "fb4dca",
          "name": "project",
          "x": 436,
          "y": 1072,
          "columns": [
            {
              "id": "25ec03",
              "name": "id",
              "datatype": "INT",
              "primaryKey": true
            },
            {
              "id": "6f49fb",
              "name": "name",
              "datatype": "VARCHAR",
              "primaryKey": ""
            },
            {
              "id": "8a8c2e",
              "name": "user_id",
              "datatype": "INT",
              "primaryKey": ""
            }
          ]
        }
      ],
      "connections": [
        {

          "sparent": "user",
          "tparent": "project",
          "source": "8e2118",
          "target": "8a8c2e"
        }
      ]
    } `;

    const data = JSON.parse(json);

    let tables = [];
    tables = res.tables;
    console.log(res.dbName)
    // this.dbN=res.dbName;
    this.projectdb = this.fb.group({
      dbName: [res.dbName],
      dbType: [res.dbType],
      tables: this.fb.array(res.tables.map(t => this.fb.group({
        id: [t.id],
        name: [t.name],
        x: [t.x],
        y: [t.y],
        columns: this.fb.array(t.columns.map(c => this.fb.group({
          id:[c.id],
          name: [c.name],
          datatype: [c.datatype],
          primaryKey: [c.primaryKey],
          required: [c.required],
          taille: [c.taille]
        })))
      }))),
      connections: this.fb.array(res.connections.map(t => this.fb.group({
        tablesource: [t.sparent],
        tabletarget: [t.tparent],
        source: [t.source],
        target: [t.target],






      })

      ))

    });

  });





    //this.nodes = data.dbName;
    //this.connections = data.dbType;
  }













  //EXTRA METHODS BEGIN
  init() {
    this.projectdb.get("tables")['controls'].forEach((element: { value: { id: any; columns: any[]; }; }, i: string) => {
      //console.log(this.projectdb.get("tables")['controls'][i].value.id)
      this.jsPlumbInstance.draggable(element.value.id, { containment: 'parent' });
      element.value.columns.forEach((element, j) => {
        console.log(i + " and " + j)



        this.setSource(element.id);
        this.setTarget(element.id);
      });

    });

    this.projectdb.get("connections")['controls'].forEach(element => {
      const conn = this.jsPlumbInstance.connect({ source: element.value.source, target: element.value.target });

    });

  }

  setSource(id) {
    this.jsPlumbInstance.makeSource(id, {
      anchor: ["Continuous", { faces: ["left", "right"] }],
      paintStyle: { fill: "blue" },
      filter: ":not(input):not(i):not(select)",
      connectorStyle: { stroke: "blue", strokeWidth: 3 },
      connector: ["Bezier", { curviness: 10 }],
      allowLoopback: false,
      connectorOverlays: [


        ['Label', {
          label: "X",
          events: {
            "tap": (params: any) => {
                this.jsPlumbInstance.deleteConnection(params.component);
                const control = <FormArray>(
                  this.projectdb.get("connections")
                );
                for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
                  const s = this.projectdb.get("connections")['controls'][x].get("source").value;
                  const t = this.projectdb.get("connections")['controls'][x].get("target").value;

                  if ((params.component.sourceId == s) && (params.component.targetId == t)) {
                    control.removeAt(x);


                }
              }
            }
          }, location: 0.5, cssClass: 'connectingConnectorLabel'
        }],
      ]
    });
  }

  setTarget(id) {
    this.jsPlumbInstance.makeTarget(id, {
      anchor: ["Continuous", { faces: ["left", "right"] }],
      paintStyle: { fill: "blue" },
      connectorStyle: { stroke: "blue", strokeWidth: 3 },
      connector: ["Bezier", { curviness: 10 }],
      filter: ":not(input):not(i):not(select)",
      allowLoopback: false,
    });


  }

  primatyKeyCheck(i, j) {
    this.projectdb.get("tables")['controls'][i].get("columns")['controls'].forEach(element => {
      //console.log(element.value.primaryKey)
      if (element.value.primaryKey) {
        this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("primaryKey").setValue(false);
      }
    });
  }


  setPosition(i, x, y) {
    this.projectdb.get("tables")['controls'][i].get("x").setValue(x);
    this.projectdb.get("tables")['controls'][i].get("y").setValue(y);
  }



  //EXTRA METHODS END



  //ADD + UPDATE + REMOVE ACTIONS BEGIN
  addColumn(j) {
    const control = <FormArray>(
      this.projectdb.get("tables")['controls'][j].get("columns")
    );
    control.push(this.initColumn());

    const columnid = this.projectdb.get("tables")['controls'][j].value.columns[String(control.length - 1)].id;
    setTimeout(() => this.setTarget(columnid), 1);
    setTimeout(() => this.setSource(columnid), 1);
  }

  addTable() {
    const control = <FormArray>this.projectdb.get("tables");
    control.push(this.initTable());

    const tableid = this.projectdb.get("tables")['controls'][String(control.length - 1)].value.id;
    const columnid = this.projectdb.get("tables")['controls'][String(control.length - 1)].value.columns[0].id;


    setTimeout(() =>
      this.jsPlumbInstance.draggable(tableid, { containment: 'parent' }), 100);
    setTimeout(() =>
      this.setSource(columnid), 100);
    setTimeout(() =>
      this.setTarget(columnid), 100);
  }

  updateConnectionOverlays(conn) {

    this.jsPlumbInstance.getConnections().forEach(element => {
      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("source").value;
        const t = this.projectdb.get("connections")['controls'][x].get("target").value;
        console.log(s + " and " + element.source.id)
        if ((s == conn.sourceId) && (t == conn.targetId)) {
        }
      }
    });
  }


  onTableNameChanges(searchValue: string, i): void {
    const tableid = this.projectdb.get("tables")['controls'][i].value.id;
    this.jsPlumbInstance.getConnections().forEach(element => {
      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("spid").value;
        const t = this.projectdb.get("connections")['controls'][x].get("tpid").value;
        if (tableid == s) {
          this.projectdb.get("connections")['controls'][x].get("sparent").setValue(searchValue)
        } else if (tableid == t) {
          this.projectdb.get("connections")['controls'][x].get("tparent").setValue(searchValue)
        }
      }
    });
  }

  onColumnTypeChanges(searchValue: string, i, j) {
    /*
    //console.log(searchValue)
    const columnid = this.projectdb.get("tables")['controls'][i].value.columns[j].id;

    for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
      const s = this.projectdb.get("connections")['controls'][x].get("source").value;
      //console.log(s +" and "+ columnid)

      const t = this.projectdb.get("connections")['controls'][x].get("target").value;
      if (columnid == s) {
        this.projectdb.get("tables")['controls'].forEach(element => {
          //console.log(element)
          element.value.columns.forEach(element => {
            console.log(element.Current)
            if (element.name == this.projectdb.get("connections")['controls'][x].get("t").value) {
              this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("name").setValue("plll");
              setTimeout(() => console.log("this will get changed " + element.name + " to " + this.projectdb.get("tables")['controls'][i].value.columns[j].datatype), 1);
            }
          });
        });
      }
    }*/
  }

  onColumnNameChanges(searchValue: string, i, j): void {
    const columnid = this.projectdb.get("tables")['controls'][i].value.columns[j].id;
    this.jsPlumbInstance.getConnections().forEach(element => {
      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("source").value;
        const t = this.projectdb.get("connections")['controls'][x].get("target").value;
        if (columnid == s) {
          this.projectdb.get("connections")['controls'][x].get("s").setValue(searchValue)
        } else if (columnid == t) {
          this.projectdb.get("connections")['controls'][x].get("t").setValue(searchValue)
        }
      }
    });

  }

  removeTable(i) {

      const control = <FormArray>this.projectdb.get("tables");
      for (let x = 0; x < this.projectdb.get("tables")['controls'][i].get("columns")['controls'].length; x++) {
        this.removeConnection(i, x)
      }
      control.removeAt(i);

  }

  removeColumn(i, j) {

      const control = <FormArray>(
        this.projectdb.get("tables")['controls'][i].get("columns")
      );
      this.removeConnection(i, j)
      control.removeAt(j);

  }

  removeConnection(i, j) {

    const control2 = <FormArray>(
      this.projectdb.get("connections")
    );
    const columnid = this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].value.id;
    console.log("columnid")

    this.jsPlumbInstance.getConnections().forEach(element => {

      if ((columnid == element.source.id) || (columnid == element.target.id)) {

        for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
          const s = this.projectdb.get("connections")['controls'][x].get("source").value;
          const t = this.projectdb.get("connections")['controls'][x].get("target").value;
          console.log(s + " and " + element.source.id)
          if ((s == element.source.id) && (t == element.target.id)) {
            control2.removeAt(x);
          }
        }
        this.jsPlumbInstance.deleteConnection(element);

      }
    });
    setTimeout(() => this.jsPlumbInstance.repaintEverything(), 1);

  }
  //ADD + UPDATE + REMOVE ACTIONS BEGIN


  //SUBMIT PMETHODS BEGIN

  upload_file(content) {
    let data = new Blob([content], { type: 'application/json' });
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let applicationZip = new File(arrayOfBlob, "Mock.json", { type: 'application/json' });

    const formData = new FormData();
    formData.append('text', applicationZip);
    formData.append('image', "okay now");

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onSubmit(form) {
    this.tables = "";
    this.attributes = "";
    //get dbName
    // console.log(form["dbName"] || {});
    if (form["dbName"]==0)
    {
      alert("enter a data base name")
    }
    if (form["dbType"]==0)
    {
      alert("enter a type for your data base")
    }

    //get dbType
     console.log(form["connections"] || {});
    //get tables
    //this.tables = form["tables"] || {};
    //console.log(this.tables)

    //return sql format for creating tables
   // console.log(this.sql_content(form["tables"] || {}));
    //return sql format for creating tables
    console.log(form["tables"]|| {});
    for (let j = 0; j <form["tables"].length; j++) {
this.i=j++;
    if (form["tables"][j].name == (form["tables"][this.i].name))
    {
console.log(form["tables"][j].name)
console.log(form["tables"][this.i].name)

      alert("the same name of table , please change it  with anthore name")
    }
else {
   this.upload_file(JSON.stringify(form || {}, null, 4))
}

    }


    //upload SQL file
    //this.upload_file(this.tables);

    //upload JSON Tables
   // this.upload_file(JSON.stringify({ tables: form["tables"] || {}}, null, 4));

    //upload the whole json content
    //this.upload_file(JSON.stringify(form || {}, null, 4));
  }


  //SUBMIT PMETHODS BEGIN




  //GENERATING JSON BEGIN


  fillFromJson() {

    const json = ` {
      "dbName": "app",
      "dbType": "MySql",
      "tables": [
        {
          "id": "45ff61",
          "name": "client",
          "x": 58,
          "y": 681,
          "columns": [
            {
              "id": "8e2118",
              "name": "id",
              "datatype": "INT",
              "primaryKey": true
            },
            {
              "id": "9961e9",
              "name": "username",
              "datatype": "VARCHAR",
              "primaryKey": ""
            },
            {
              "id": "5bbc7f",
              "name": "phone",
              "datatype": "INT",
              "primaryKey": ""
            }
          ]
        },
        {
          "id": "fb4dca",
          "name": "project",
          "x": 436,
          "y": 1072,
          "columns": [
            {
              "id": "25ec03",
              "name": "id",
              "datatype": "INT",
              "primaryKey": true
            },
            {
              "id": "6f49fb",
              "name": "name",
              "datatype": "VARCHAR",
              "primaryKey": ""
            },
            {
              "id": "8a8c2e",
              "name": "user_id",
              "datatype": "INT",
              "primaryKey": ""
            }
          ]
        }
      ],
      "connections": [
        {

          "sparent": "client",
          "tparent": "project",
          "source": "8e2118",
          "target": "8a8c2e"
        }
      ]
    } `;
    const data = JSON.parse(json);

    this.projectdb = this.fb.group({
      dbName: [data.dbName],
      dbType: [data.dbType],
      tables: this.fb.array(data.tables.map(t => this.fb.group({
        id: [t.id],
        name: [t.name],
        x: [t.x],
        y: [t.y],
        columns: this.fb.array(t.columns.map(c => this.fb.group({
          id: [c.id],
          name: [c.name],
          datatype: [c.datatype],
          primaryKey: [c.primaryKey],
          required: [c.required],
          taille: [c.taille],
        })))
      }))),
      connections: this.fb.array(data.connections.map(conn => this.fb.group({

        tablesource: [conn.sparent],
        tabletarget: [conn.tparent],

        source: [conn.source],
        target: [conn.target]
      })))
    });




  }

  prototype() {
    this.projectdb = this.fb.group({
      dbName: [""],
      dbType: [""],
      tables: this.fb.array([this.initTable()]),
      connections: this.fb.array([this.initConnections("", "", "", "")])
    });
  }


  //GENERATING JSON END




  //INITIALIZERS BEGIN
  initConnections(source, target, sparent, tparent) {
    return this.fb.group({


      sparent: [sparent],
      tparent: [tparent],
      source: [source],
      target: [target]
    });
  }
  initTable() {
    return this.fb.group({
      id: [Math.random().toString(16).slice(2, 8)],
      name: [""],
      x: [""],
      y: [""],
      columns: this.fb.array([this.initColumn()])
    });
  }

  initColumn() {
    return this.fb.group({
      id: [Math.random().toString(16).slice(2, 8)],
      name: [""],
      datatype: [""],
      primaryKey: [""],
      required: [""],
      taille: [""],
    });
  }
  //INITIALIZERS END




  //METHODS USED IN HTML BEGIN

  getTables(form) {
    //console.log(form.get('tables').controls);
    return form.controls.tables.controls;
  }

  getColumns(form) {
    //console.log(form.controls.columns.controls);
    return form.controls.columns.controls;
  }

  //METHODS USED IN HTML END



   x;


  //TESTING BEGIN

  sub2(form) {

    console.log(this.jsPlumbInstance.makeSource);
    //source
    //console.log(this.jsPlumbInstance.getAllConnections()[0].endpoints[0].element.id);
    //target
    //console.log(this.jsPlumbInstance.getAllConnections()[0].endpoints[1].element.id);

    //console.log(this.x)


  }
  getHeroes(): void {
    this.httpClient.get('http://localhost/test.txt')
    .subscribe(data => this.x=data );
  }
  //TESTING END

}


