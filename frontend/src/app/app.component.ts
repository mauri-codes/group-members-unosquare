import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Member {
  name: string
  id?: string
  title?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url = "http://localhost:3300/members"
  inputText = ""
  title = 'interview-app'
  members: Member[] = []
  filteredMembers: Member[] = []
  http
  constructor(
    http: HttpClient
  ) {
    this.http = http
  }
  updateFilteredMembers () {
    this.filteredMembers = this.members
      .filter(member => {
        const { name } = member
        return name.toLowerCase().includes(this.inputText.toLowerCase())
      })
    let sortByName = (memberA: Member, memberB:Member) => (memberA.name > memberB.name) ? 1 : -1
    this.filteredMembers.sort(sortByName)
  }
  ngOnInit() {
    let request = this.http.get(this.url)
    request.subscribe(data => {
      this.members = data as {name: string}[]
      this.updateFilteredMembers()
    })
  }
}
