import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IPosts } from '../../../posts';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: [ './delete-dialog.component.css' ],
  providers: [UserService, SnackbarService]
})
export class DeleteDialogComponent implements OnInit  {

    newForm: FormGroup;
    _newData: any;
    _postsArray: any;
    id = this.data.dataId.id;

    message: string;

    constructor(
        public snackBar: SnackbarService,
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService) { }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    onSubmit() {
        this.deletePost(this.id)
    }

    deletePost(id: number): void {
        this.userService.deletePosts(this.id)
            .subscribe(p => {
                console.log('Return updated array: ', p)
                this.message = 'Post deleted successfully.'
                this.dialogRef.close(p);
                this.snackBar.openSnackBar(this.message)
            });
    }
}

