import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IPosts } from '../../../posts';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: [ './add-dialog.component.css' ],
  providers: [UserService, SnackbarService]
})
export class AddDialogComponent implements OnInit  {

    newForm: FormGroup;
    _newData: any;
    _postsArray: any;
    id = this.data.dataId.id;
    message: string;


    constructor(
        public snackBar: SnackbarService,
        public dialogRef: MatDialogRef<AddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService) { }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        
        this.newForm = new FormGroup({
            userId: new FormControl(this.data.dataId.userId),
            title: new FormControl(this.data.dataId.title),
            body: new FormControl(this.data.dataId.body),
            id: new FormControl(this.data.dataId.id),
        });
    }

    onSubmit() {
        this._newData = JSON.stringify(this.newForm.value);
        this.addPost(this._newData)
    }

    addPost(postForm): void {
        this.userService.addPosts(postForm)
            .subscribe(p => {
                this.message = 'Post added successfully.'
                this.dialogRef.close(p);
                this.snackBar.openSnackBar(this.message)
            });
    }


}

