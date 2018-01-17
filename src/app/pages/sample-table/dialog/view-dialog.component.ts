import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IPosts } from '../../../posts';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';
import { IUser } from '../../../user';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: [ './view-dialog.component.css' ],
  providers: [UserService, SnackbarService]
})
export class ViewDialogComponent implements OnInit  {
    [x: string]: any;

    newForm: FormGroup;
    _userArray: IUser[];
    _newData: any;
    message: string;
    displayedColumns = ['firstName', 'lastName', 'userName', 'email', 'address', 'gender', 'position', 'image', 'privilege'];
    
    dataSource = new MatTableDataSource(this.data.userArray);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public snackBar: SnackbarService,
        public dialogRef: MatDialogRef<ViewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService) { }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

    onScroll () {
        console.log('scrolled!!')
    }

    ngOnInit() {
        console.log('Data Source', this.dataSource );
        
        // this.getUser();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }



    
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        
    }

}

