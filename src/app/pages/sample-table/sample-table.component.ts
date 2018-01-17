import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IPosts } from '../../posts';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AddDialogComponent } from './dialog/add-dialog.component';
import { EditDialogComponent } from './dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialog/delete-dialog.component';
import { ViewDialogComponent } from './dialog/view-dialog.component';
import { IUser } from '../../user';

@Component({
  selector: 'app-sample-table',
  templateUrl: './sample-table.component.html',
  styleUrls: [ './sample-table.component.css' ],
  providers: [UserService]
})

export class SampleTableComponent implements AfterViewInit, OnInit  {
 
    _postsArray: IPosts[];
    _userArray: IUser[];
    dataSource;
    displayedColumns = ['userId', 'id', 'title', 'body', 'button'];
    formData: any;
    getPost: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userSerivce: UserService, public dialog: MatDialog) { }

    ngOnInit() {
        this.getPosts();
        this.getUser();
    }

    ngAfterViewInit() {
        
    }

    getPosts(): void {
        this.userSerivce.getPosts()
            .subscribe(
                resultArray => {
                    this._postsArray = resultArray;
                    this.dataSource = new MatTableDataSource(this._postsArray);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error => console.log("Error :: " + error)
            );
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    openDialog(id): void {

    }

    addDialog(): void {
        let dialogRef = this.dialog.open(AddDialogComponent, {
            width: '500px',
            data: { dataId: '' }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getPosts();
        });
    }

    editDialog(id): void {
        this.userSerivce.getPosts()
            .subscribe(
                resultArray => {
                    this.getPost =  resultArray.find(x => x.id == id);
                    let dialogRef = this.dialog.open(EditDialogComponent, {
                        width: '500px',
                        data: { dataId: this.getPost }
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        this.getPosts();
                    });
                }
            );
    }

    deleteDialog(id): void {
        this.userSerivce.getPosts()
            .subscribe(
                resultArray => {
                    this.getPost =  resultArray.find(x => x.id == id);
                    let dialogRef = this.dialog.open(DeleteDialogComponent, {
                        width: '500px',
                        data: { dataId: this.getPost }
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        this.getPosts();
                    });
                }
            );
    }

    viewDialog(id): void {
        this.userSerivce.getPosts()
            .subscribe(
                resultArray => {
                    this.getPost =  resultArray.find(x => x.id == id);
                    let dialogRef = this.dialog.open(ViewDialogComponent, {
                        width: '1200px',
                        data: { dataId: this.getPost, userArray: this._userArray }
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        this.getPosts();
                    });
                }
            );
    }

    getUser(): void {
        this.userSerivce.getUser()
            .subscribe(
                resultArray => {
                    console.log(resultArray)
                    this._userArray = resultArray;
                },
                error => console.log("Error :: " + error)
            );
    }

}

