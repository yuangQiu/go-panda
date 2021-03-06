import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { I18NService } from 'app/shared/api';
import { AppService } from 'app/app.service';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { I18nPluralPipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MenuItem ,ConfirmationService} from '../../components/common/api';

@Component({
    selector: 'bucket-list',
    templateUrl: './buckets.html',
    styleUrls: [],
    providers: [ConfirmationService],
    animations: [
        trigger('overlayState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ]),

        trigger('notificationTopbar', [
            state('hidden', style({
            height: '0',
            opacity: 0
            })),
            state('visible', style({
            height: '*',
            opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ]
})
export class BucketsComponent implements OnInit{
    selectedBuckets=[];
    allBuckets = [];
    createBucketForm:FormGroup;
    errorMessage = [];
    createBucketDisplay=false;
    backendsOption = [];
    constructor(
        public I18N: I18NService,
        private router: Router,
        private ActivatedRoute:ActivatedRoute,
        private confirmationService: ConfirmationService,
        private fb:FormBuilder
    ){
        this.createBucketForm = this.fb.group({
            "backend":[""],
            "name":[""]
        });
    }

    ngOnInit() {
        this.allBuckets = [
            {
                name:"test",
                backend:"OS_ch_beijing_eastern",
                created:"2018-02-25 07:30:12",
            },
            {
                name:"bucket_s3",
                backend:"OS_ch_beijing_western",
                created:"2018-02-25 07:30:12",
            }
        ];
        this.backendsOption = [
            {
                label:"All Backends",
                value:"All Backends",
            }
        ];
    }
    showCreateForm(){
        this.createBucketDisplay = true;
    }
    deleteBucket(bucket){
        let msg = "<div>Are you sure you want to delete the Bucket ?</div><h3>[ "+ bucket.name +" ]</h3>";
        let header ="Delete";
        let acceptLabel = "Delete";
        let warming = true;
        this.confirmDialog([msg,header,acceptLabel,warming,"delete"])
    }
    confirmDialog([msg,header,acceptLabel,warming=true,func]){
        this.confirmationService.confirm({
            message: msg,
            header: header,
            acceptLabel: acceptLabel,
            isWarning: warming,
            accept: ()=>{
                try {
                    
                }
                catch (e) {
                    console.log(e);
                }
                finally {
                    
                }
            },
            reject:()=>{}
        })
    }

}
