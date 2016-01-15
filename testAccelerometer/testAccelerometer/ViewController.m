//
//  ViewController.m
//  testAccelerometer
//
//  Created by 郑庆登(Qingdeng Zheng)-IT服务中心 on 15/12/31.
//  Copyright © 2015年 郑庆登(Qingdeng Zheng)-IT服务中心. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [[UIAccelerometer sharedAccelerometer]setDelegate:self];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (void)accelerometer:(UIAccelerometer *)accelerometer didAccelerate:
(UIAcceleration *)acceleration{
    [self.labelX setText:[NSString stringWithFormat:@"%f",acceleration.x]];
    [self.labelY setText:[NSString stringWithFormat:@"%f",acceleration.y]];
    [self.labelZ setText:[NSString stringWithFormat:@"%f",acceleration.z]];
}
@end
