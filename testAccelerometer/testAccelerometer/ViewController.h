//
//  ViewController.h
//  testAccelerometer
//
//  Created by 郑庆登(Qingdeng Zheng)-IT服务中心 on 15/12/31.
//  Copyright © 2015年 郑庆登(Qingdeng Zheng)-IT服务中心. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController<UIAccelerometerDelegate>

@property (weak, nonatomic) IBOutlet UILabel *labelX;
@property (weak, nonatomic) IBOutlet UILabel *labelY;
@property (weak, nonatomic) IBOutlet UILabel *labelZ;

@end

