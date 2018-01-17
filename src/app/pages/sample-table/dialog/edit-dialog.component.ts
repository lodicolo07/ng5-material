import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IPosts } from '../../../posts';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: [ './edit-dialog.component.css' ],
  providers: [UserService, SnackbarService]
})
export class EditDialogComponent implements OnInit  {

    newForm: FormGroup;
    _newData: any;
    _postsArray: any;
    id = this.data.dataId.id;

    message: string;

    constructor(
        public snackBar: SnackbarService,
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService) { }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.newForm = new FormGroup({
            userId: new FormControl(this.data.dataId.userId),
            id: new FormControl(this.data.dataId.id),
            title: new FormControl(this.data.dataId.title),
            body: new FormControl(this.data.dataId.body)
        });
    }

    onSubmit() {
        this._newData = JSON.stringify(this.newForm.value);
        this.editPost(this._newData)
    }

    editPost(postForm): void {
        this.userService.editPosts(postForm, this.id)
            .subscribe(p => {
                this.message = 'Post updated successfully.'
                this.dialogRef.close(p);
                this.snackBar.openSnackBar(this.message)
            });
    }

}

