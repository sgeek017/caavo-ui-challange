import { UserModel } from './../../model/user.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent implements OnInit {
  userList: UserModel[];
  gropuIcon: any = "../../../assets/img/people.png";

  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.userService.getUsers().subscribe(
      userList => {
        // this.userList = userList;
        userList.map(users => {
          users.selected = false;
        });
        this.userList = userList;

      },
      error => {
        console.error(error);
      });
  }

  selectUser(userLocal: UserModel) {

    if (userLocal.selected == true) {
      userLocal.selected = false;
    } else {
      userLocal.selected = true;
    }

    this.userList.find(users => {
      if (users.id == userLocal.id) {
        users = userLocal;
      }
    });
  }

  sortOrder(event) {
    const value = event.detail.value;

    if (value === 'asc') {
      this.userList.sort((x, y) => {
        var nameA = x.name.toLowerCase(), nameB = y.name.toLowerCase();
        if (nameA < nameB)
          return -1;
        if (nameA > nameB)
          return 1;
      });
    } else {
      this.userList.sort((x, y) => {
        var nameA = x.name.toLowerCase(), nameB = y.name.toLowerCase();
        if (nameA > nameB)
          return -1;
        if (nameA < nameB)
          return 1;
      });
    }
  }

  openFileDialog() {
    let event = new MouseEvent('click', { bubbles: false });
    this.fileInput.nativeElement.dispatchEvent(event);

  }

  uploadImage(imageInput) {

    const file: File = imageInput.files[0];

    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.gropuIcon = reader.result;
    };
  }
}
