---
title: 复试英语问答
date: 2024-02-26
updated: 2024-03-03
categories: 考研
tags:
  - 考研
top: 1
excerpt_type: html
---

## 英语自我介绍

Good (morning), professors. I feel honored to have the opportunity to address you here today. My name is Yan Chaowen, an open-minded man. I come from  Lianyungang, a beautiful  city of Jiangsu Province. 

lt was nearly 4 years ago when I entered the  Nanjing University of Finance & Economics , where I officially became a student majoring in Computer Science. During the four years, I have been studying hard and was granted scholarship several times. In addition,  I was designated as Honorable Mention in MCM.

When I was in the third year of university, I was fortunate to participate in Interdisciplinary Contest In Modeling. My main task was to implement model. I collected certain basic algorithms online and learn to implement my own functions. This experience helped me to deepen my professional study, and in the process I also enjoyed the joy of academic research. 

Through studying professional knowledge and reading books involving relevant specialty, I find myself gradually obsessed with the charm of this major and would like to make some contributions in this field. I realize what I have learned is not adequate for this target. That is  why I choose to further my study with a master degree, and it would be great if I can continue my interest.

As is well-known, Beijing Normal University is an outstanding collage with perfect academic atmosphere and highly qualified faculty. And I would appreciate it if you could give me the chance for further study.



## 毕设问答

### **1.** **为什么选这个题目/为什么做这个？**

从实际生活出发的。我观察到不少视频网站会选择在传输时对图像或视频进行压缩处理，比如降低图像的分辨率，降低视频的码率，这样做能减轻服务器的负担，但是用户端只能使用低分辨率的图像，还很难转换为高分辨率图像。

我在网上搜索后，发现了图像超分辨率这一low-level任务，我还了解到，在智能显示领域，医学成像领域也有超分的需求。因此便确定了毕设的课题，最后的成果还能为自己提供服务。

研究背景（可以混在课题选择和研究目的里）：也就是研究意义

> 图像压缩传输领域：为了降低海量数据对传输带宽的压力，图像或视频数据在传输时会进行压缩处理，比如降低图像的分辨率。但是人们对这些图像或视频的清晰度要求是很高的，因此在接收端就需要使用图像超分辨率技术来提升分辨率，尽可能重建出原有的高清图像或视频。
>
> 智能显示领域：普通摄像头拍摄的图像分辨率一般偏低，不能满足高分辨率的视觉要求。目前 4K 高清显示逐渐走向普及，但很多成像设备拍摄的图片以及老电影的像素分辨率远不及 4K。
>
> 医学成像领域：医学仪器采集得到的图像分辨率通常偏低，高分辨率医学影像有利于发现微小的病灶。

### 2.怎么具体做的？

**研究目的-研究方法-思路设计-目前的进度、难点及拟解决方案**

**在每个环节都要体现两点：研究支持和个人思考。**

- 研究目的：提高图像的分辨率；丰富图像的纹理细节

- 研究方法：读文献=>使用

 超分综述长文：https://blog.csdn.net/Wenyuanbo/article/details/125428995

一问读懂SRGAN：https://blog.csdn.net/MR_kdcon/article/details/123525914

 **（1）为什么选择深度学习(GAN)？（为什么选择某个方法或理论）**

 阅读过几篇超分综述，将超分算法分为三大类：基于插值，基于重建，基于学习的方法。

基于插值的方法，问题在于假设图像连续，重建结果往往边缘和轮廓模糊，纹理细节丢失，重建效果十分有限。

基于重建的方法使用先验知识获得局部最优解，但往往收敛不理想。

 目前主流方法是基于深度学习即CNN的方法。基于学习的超分辨率算法拥有优秀的细节表征能力，在重建结果上取得了远超传统算法的优势。因此我最终选择了CNN作为主要方法。

此外，我还了解到Transformer在图像超分辨率领域获得了成功，但是Vision Transformer所需的硬件成本过高（高计算成本和高GPU占用），难以纳入考虑范围。

 **（2）方法（网络结构，损失函数）**

沿用了GAN的基本结构：生成器和判别器。

 生成网络用一个卷积层学习底层特征，多个卷积层（一个深度网络）学习高层特征，通过一个反卷积层和一个卷积层输出重建图像。

 判别网络就是一个简单的CNN网络，其实就是一个VGG网络，最后使用一个Sigmoid函数做一个二分类任务。

 **（3）有遇到过什么问题吗？** 

客观评价指标的选择。目前评价超分重建最常用的客观评价指标有峰值信噪比PSNR，均方误差MSE和结构相似性SSIM。这些指标需要使用真实的高分辨率图像作为参考，来评价重建后的超分图像与真实图像之间的相似度，相似度越高，重建效果越好。

但是时常遇到，重建的超分图像的主观评价高，但客观评价低的情况，这是个非常矛盾的情况。在阅读文献后，我使用了SRGAN作者提出的感知损失。SRGAN本质上是提供了一种新的Loss function——perceptual loss(感知损失)。

感知损失由内容损失和对抗损失组成。内容损失：取MSE或者VGG损失，以及一定比率的对抗损失(GAN网络本身就有的损失函数)组成。

> 为什么MSE损失不行？
>
> 之前的SR都是由MSE损失函数来教会网络如何实现LR→HR。MSE会对图像的细节进行平滑，网络在训练中会让重建图像具有很高的PSNR，但是失去了人肉眼感知的高分辨感，即论文中的Photo-Realistic。

> 为什么感知损失(VGG损失)行？
>
> VGG损失是feature-map-wise，它比MSE更能衡量感知上的相似度。feature-map-wise是对HR和SR图像整体做loss，因此它提升的是SR图像整体感知；而MSE是针对像素级(pixel-wise)，这样很容易将图像局部细节平滑掉。
>
> VGG损失，所谓的VGG损失是作者采用预训练好的VGG-19网络的特征向量，使得生成网络的结果通过VGG某一层之后产生的feature map，和标签  $I ^ (HR)$ 通过VGG网络产生的feature map做loss。这种loss更能反应图片之间的感知相似度。



### 3.我的收获

**谈自己在毕设过程中的收获更切实。**

通过毕业设计，初步涉足了科研生活，切身体会了遇到问题、分析问题、解决问题的过程，觉得这个过程挺有趣。自己更加向往研究生阶段去更好地探索问题。

通过毕设，将之前学习的知识与实际应用联系了起来，让理论指导了实践，给自己了一种充实感和满足感。除此之外，把自己学习的知识串联了起来，让它们能在一个整体中发挥各自的作用，让自己对学过的东西有了更高层次的理解。

从0开始学习深度学习，到实现自己的毕业设计，选择研究课题，确定网络结构，选择激活函数，合理初始化权重、使用BatchNorm应对梯度消失，梯度爆炸，选择合适的优化方法，不停地调整参数，到最后完成作品，非常的满足。



## 1，自我介绍（Please introduce yourself）

Good morning professors, my name is xxx. I'm from xx University，My major is xxx.
First of all, in my undergraduate career,I have hosted the post of class monitor for four years, exactly it exercised me a lot and also I did follow my professional teacher to do some projects and participate in some computer contests.And I didn't get any awards, but I really acquired a lot from that experience.

And secondly,in my spare time I like to practice my spoken English and pronunciation, And also read some books and English newspapers such as the Economist, the China Daily and so on. All I do is just to improve my English ability because I think this ability is very very important whether in our study or work. And other time I also read some books, and know some Information about my professional field such as xxx .

Finally,For me,a student of this field, I hope I can make some achievements in this field to help our people live better and make our society even the world become better, That's all,Thank you for your time.

老师教授们，大家早上好，我叫 xxx。我来自 xx 大学，主修xxx。

首先在我的本科生涯中，我担任了四年的班长，这让我受到了很大的锻炼，我也跟着我的专业老师做了一些项目，参加了一些计算机比赛，虽然很少获奖，但是我真的从中学到了很多。其次，在我的业余时间，我喜欢练习我的英语口语和发音，并阅读一些书籍和英语报纸，如《经济学家》，《中国日报》等。所做的一切都是为了提高我的英语能力，因为这种能力无论是在我们的学习或工作，都是非常重要的。其他时间我也读一些书，了解关于我专业领域的一些信息，如xxx。

最后，对我来说，作为这个专业的学生，我希望我能在这个专业领域取得一些成就，帮助我们的人民生活得更好，让我们的社会甚至世界变得更好，就这样。谢谢大家，自我介绍介绍完毕。

## 2，为什么选择考研？（Why do you decide to go for the national postgraduate entrance examination）

Thank you for your question.

During my undergraduate studies in the past three and half years, I gradually realized that the knowledge and skills I acquired in college would not be enough for me to fulfill my personal goals in society. Moreover, my desire for knowledge grew as I dug deeper into this field. Therefore, I feel it‘s necessary for me to further my study instead of going to work after graduation.
That' s all. Thank you for your time.

非常感谢老师的提问，在过去三年半的本科学习中，我逐渐意识到，当我走向社会，我在大学里学到的知识和技能不足以实现我的个人目标。此外，随着我对这个领域的深入了解，我希望自己能学习到这个领域里更多的知识。因此，我觉得我有必要继续深造，而不是毕业后去工作。 谢谢，我回答完毕了。

## 3，为什么选择我们学校？（Why do you prefer our university?）

Thank you for your question.

I was initially attracted by your university’s high reputation. After consulting with several friends who have studied at your university, I was even more impressed by the university’s strong academic atmosphere and the professors’ sense of responsibility, all of which strengthened my determination to continue my studies at your university.

That' s all. Thank you for your time.

非常感谢老师的提问，我最初被贵校的优秀的声誉口碑所吸引。在咨询了几位曾在贵校学习的朋友后，我对贵校浓厚的学术氛围和老师们认真负责的教学态度产生了更深刻的印象，这也增强了我继续在贵校学习的决心。谢谢，我回答完毕了。

## 4，你的研究生学习规划（What do you expect to achieve during your study if you are enrolled/admitted into this university ?）

Thank you for your question.

If I get the chance to learn at ______ University, I will concentrate on the study and research in this field. First, I will work hard to learn the theoretical knowledge, constructing a solid foundation for my further study; Second, I would like to do some practical work with the help of my supervisor and classmates. And through this, I can get some skills that cannot be acquired from the textbooks. I hope that in the next three years, I can improve my ability of learning and independent thinking, and have valuable academic outputs.

That' s all. Thank you for your time.

非常感谢老师的提问，如果我有机会在______大学学习，我将专注于这个领域的学习和研究。首先，我会努力学 习理论知识，为我的进一步学习打下坚实的基础；第二，我想在导师和同学的帮助下做一些实践工作。通过动手实践，我可以学到一些从课本上学不到的技能。我希望在接下来的三年里，我能提高我的学习能力和独立思考能力，并取得有价值的学术成果。

谢谢，我回答完毕了。

## 5，介绍你的本科院校和主修课程

Thank you for your question.

I studied in XX major of XX school. During my college years, I mainly studied XX, XXX, XXX and other courses, of which XX course is the core course of this major, and the main content is XXX.

I major in Computer Science , in Nanjing University of Finance and Economics . It holds a leading position in the field of economics and management fields, which provides a solid foundation for educating high-quality talents with innovative spirit and practical ability.  In  my opinion, my college is a high-level university with a long history, excellent faculty, and abundant teaching resources, and will make greater contributions to promoting social and economic development in the future.

That' s all. Thank you for your time.

非常感谢老师的提问，我就读于xx学校xx专业，在大学期间我主要学习了xx、xxx、xxx等课程，其中xx课程是本专业的核心课程，主要内容是xxx。谢谢，我回答完毕了。

## 6，你的优缺点？（What are your strengths and weakness?）

First of all, I am calm and restrained. I have strong adaptability and resilience when facing an unfamiliar environment and unexpected events.

Moreover, I will make a plan for myself every week and complete the tasks strictly according to the plan. Once I determine something,no matter what difficulties I confront, I will overcome it.

In addition, I am empathetic and optimistic so that I can get along with others cheerfully and frequently help others. （优）

I think my greatest weakness is my lack of self-confidence. When comparing myself with others, I always focus on my shortcomings and magnify them,Before an examination or a presentation, I constantly fear that I'm not doing well.Even though

I've practiced it over and over again.But I'm trying to correct it. For example, I share more with my buddies how it feels to complete a task, review what I did adequately,and use more rational analysis rather than wallow in anxiety，（缺）

关于我的优点。首先，我非常冷静和内敛。在面对不熟悉的环境和意料

之外的事件时，我有较强的适应能力。另外，我会每周制定计划并且严格完成计划。当我决定做某事，不管遇到多大困难，我都会克服它。除此之外，我还具有同理心并且很乐观，因此我可以与他人愉快相处，并且乐于助人。

我觉得我最大的缺点是缺乏自信。在考试或者演讲之前，我总是担心自己做不好。即使我已经练习了一遍又一遍。但是我现在在努力改正。比如，我会更多地和朋友分享完成一项任务的感受，会回顾在其中做的好的点，运用更多的理性分析，而不是沉浸在焦虑的情绪中。

## 7，你认为研究生的主要任务是什么？（What social responsibilities should a post-graduate take? ）

Thank you for your question.

As a post-graduate, My primary task is to learn relevant professional theoretical knowledge, read cutting-edge literature in the professional field, find the development difficulties and emphases in the professional field, and finally choose my own research direction according to the teacher's suggestions, do in-depth research, conduct experiments and write papers. At the same time, we should also take into account our own moral behavior cultivation, and be a graduate student who is responsible, willing to take responsibility, can sit on the bench and can write papers.

That' s all. Thank you for your time.

感谢老师的提问，我认为作为一名研究生，我的首要任务是学习专业相关理论知识、阅读专业领域前沿文献、找到本专业领域的发展难点和侧重点，最后还需要根据老师的建议选择自己的研究方向做深入研究，并进行实验撰写论文。同时也要兼顾自身道德行为修养，做一个有责任、肯担当、能坐得住板凳、能写得出论文的研究生。谢谢，我回答完毕了。

## 8，读过那些专业书籍，有什么启发？（Have you read those professional books? What's the inspiration?）

Thank you for your question.

My major is Computer Science and one of my favorite books about is  DataStrute and algorithm.  It acts as a perfect guidance in my study, especially when I’m confused by some complicated principles . The other reason why I love this book is that it seems that every issue mentioned in the book has been well-considered. The profound meaning behind the book is more than what it just appears. 

All in all, I’ve learned a lot from this impressive book. It is a book that I’ve taken seriously, but it’s never gonna be the last.

That' s all. Thank you for your time.

我的专业是______，关于本专业我最感兴趣的书籍是______。

这本书是由______写于_______年，主要讲的是______，它对我的学习有很好的指导意义，尤其当我对专业中复杂的理论感到困惑时。我喜欢这本书的另一个原因是这本书中提到的问题都经过深思熟虑，并且后面的深意远远超过看起来那么简单。

我尤其感兴趣的部分是______，我认为这点很有说服力，也很诱人。它讲述了________的重要性。


## 9，日后是读博还是工作？（What are your future goals, do you study, or work?）

Thank you for your question.

For the future goals, I prefer to continue my study for doctorate. I like academic atmosphere and the challenges of scientific research. And I feel that I am a determined person and have a strong desire for knowledge. So, I think that I am more suitable for research.
That' s all. Thank you for your time.

对于未来的目标，我更愿意继续攻读博士学位。 我喜欢学术氛围和科学研究的挑战。 而且我觉得我是一个坚定的人，并且对知识有强烈的渴望。 所以，我认为我更适合研究。

## 10，介绍下你的家乡（Tell me about your hometown）

I am from Lianyungang, a beautiful city in Jiangsu Province. It is famous as Mount Huaguo, a well-known scenic spot. Mount Huaguo is known as the hometown of "Sun Wukong" from the classic novel "Journey to the West",  and is filled with ancient relics, towering  trees, and jagged peaks. It also boasts scenic spots closely linked to the story of "Journey to the West," such as Water Curtain Cave, Sanyuan Palace, and Jade Maiden Peak, all adding a mysterious and fantastical atmosphere to the mountain.

In conclusion, Mount Huaguo is a tourist attraction that combines natural landscapes and cultural landscapes. Whether you are a fan of natural scenery or passionate about cultural history, you can find your own fun and rewards here.

我来自美丽的河南洛阳，它被誉为“九朝古都”。洛阳在中国古代历史上扮演着非常重要的角色，有着非常丰富的文化遗产。我的家乡有许多保存完好的文物。例如，龙门石窟是中国三大石窟之一。白马寺被认为是中国佛教的发源地。此外，洛阳牡丹也是举世闻名。每年都有

许多游客来洛阳观赏牡丹花。我家乡的人民也很友好，他们欢迎来自世界各地的游客。我非常爱我的家乡。

## 11，读研后如何规划你的研究课题？（How do you plan to study for your graduate programme? ）

Thank you for your question.

In my opinion, the study method is of great importance for research. So firstly , I will choose a certain approach in my study area with your guidance ;Then, I will draw a pragmatic Research plan and time schedule. I hope I can form a systematical view of my major; Thirdly , I will make myself be familiar with the latest development of this area by reading books and journals. I do hope I will get somewhere in this field.That' s all.

Thank you for your time.

感谢老师的提问，在我看来，学习方法对于研究是非常重要的。所以我首先会在您的指导下，在我的学习领域选择一个确定的方法，然后，我会制定一个务实的研究计划和时间表。我希望我能对我的专业形成一个系统的观点; 第三，我将通过阅读书籍和期刊使自己熟悉这个领域的最新发展。我真希望我能在此领域上有所成就。谢谢，我回答完毕了。

## 12，你有意向导师吗？为什么选择他？（Are you interested in a mentor? Why choose him?）

Thank you for your question.

Before the re examination, I also contacted the tutor of the college in your university. He is Professor XX and his research direction is XXX.

When preparing for the second exam, I learned about the teachers of the college and their research direction through your school's official website. Among them, the research direction of teacher XX coincided with me. Therefore, I took the liberty to contact the teacher and read his thesis with the theme of XXX. I felt that the teacher's research direction and focus were consistent with my goal of postgraduate study.

Therefore, I hope to have the opportunity to further study with teachers, and I hope to spend my academic career under the guidance of teachers in the future.

That' s all. Thank you for your time.

谢谢老师的提问，在复试之前也曾联系过贵校该学院的导师，他是xx教授，研究方向是xxx。复试备考时，我通过贵校官网了解到了该学院老师以及他们的研究方向，其中xx老师的研究方向与我不谋而合，为此我冒昧联系了老师，并且拜读了他的以XXX为主题的论文，觉得老师的研究方向和侧重点与我读研的目标方向一致。因此我希望能有机会跟老师进一步再去学习，未来希望能够在老师的指导下度过我的学业生涯。谢谢，我回答完毕了。

## 13，本科期间你最喜欢的课程是什么？（What is your favorite subject and why?）

Thanks for your question.

My favorite course is data structure, because the teacher's class was very interesting. It stimulated our interest in programming, and helped us learn a lot of practical vocational skills. Therefore, I studied really hard in this course and spent a lot of time practicing the skills I learned, and finally got a good result in the final exam.

That is all ,thank you for your time.

感谢老师的提问，我最喜欢的课程是数据结构，因为老师上课很有趣。它激发了我们对编程的兴趣，帮助我们 学习了很多实用的职业技能。因此，我在这门课上非常用功，花了很多时间练习，最后在期 末考试中也取得了不错的成绩。谢谢，我回答完毕了。

## 14，为何挂过科？（Why did you fail in this course?）

Thanks for your question.

Well,i am sorry that i did fail the exams of xxx .The root of the failure of the courses was that my attitude was not correct,I thought l could pass the exams easily, soispent all my time on the other subjects.I didn't expect l would fail in these courses.This experience made me understand that i can′t take it for http://granted.In the future,i will keep a humble attitude and learn every lesson well.

That is all,thank you for your time.

感谢老师的提问，很抱歉，我没有通过xxx的考试。考试失败的根源是我的态度不正确，我认为我可以轻松通过考试，所以我把所有的时间都花在了其他科目上。我没想到这门课程会不及格。这次经历让我明白，我不能想当然。在未来，我会保持谦虚的态度，好好学习每一堂课。谢谢，我回答完毕了。

15，如果复试失败你会怎么办？（ What will you do if you fail in the retest?）

Thanks for your question!

If I unfortunately fail to be a postgraduate at XXX university/ this university,I will be sad for a long time I guess.But then,I will think about the causes and cures of my failure to the postgraduate entrance examination.I will prepare for the exam for one more year because studying in this school is my dream,I will spare no efforts to realize this dream.

That‘s all,thank you.

感谢老师的提问，如果我不幸未能成为XXX大学/这所大学的研究生，我想我会沮丧失落。但接下来，我会思考我考研失败的原因和改进方法。我将准备再考一年，因为在这所学校学习是我的梦想，我将不遗余力地实现这个梦想。谢谢，我回答完毕了。

## 16，大学期间印象最深刻的事（Is there anything that impressed you most in your college?）

Thanks for your question!

Frankly speaking,I have a lot of things to say when it comes to this topic.I was impressed and touched by a lot of things and people.The one that impressed me most is my preparation for this postgraduate entrance examination.There are several reasons.

Firstly,it impressed me most because I can learn a lot from it.Both my theoretical and practical knowledge has been strengthened.

Secondly,it can help me to make friends with different background. As a saying goes : a friend in need is a friend indeed.My friend XXX helped me a lot in the whole preparation process.And I really appreciate his/her help.

Thirdly,it help me to figure out what I really want In the near future I expect to be a postgraduate in this major so that I can improve myself in a more efficient way.

All in all,my preparation for this postgraduate entrance examination impressed me most.
That‘s all,thank you.
谢谢你的提问！坦率地说，说到这个话题，我有很多话要说。很多事情和人给我留下了深刻的印象和感动。给我印象最深的是我为这次研究生入学考试所做的准备。其原因有如下几个：
首先，它给我留下了最深刻的印象，因为我可以从中学到很多东西。我的理论和实践知识都得到了加强。
其次，它可以帮助我结交不同背景的朋友。俗话说：患难见真情。我的朋友XXX在整个准备过程中帮了我很多。我真的很感谢他/她的帮助。
第三，它帮助我弄清楚在不久的将来我真正想要的是什么，我希望成为这个专业的研究生，这样我就能以更有效的方式提高自己。
总而言之，这次研究生入学考试的准备给我留下了最深刻的印象。谢谢，我回答完毕了。
## 17，兴趣爱好（what's your favorite sport?why?）

Thanks for your question!

my favorite sport is outdoor running.I usually running in evening.To be honest,I am crazy about outdoor running for following reasons.

Firstly,it can help me to relieve all my pressure.No matter how frustrated I am ,I can feel relaxed in the moment when I’m running .

Secondly,outdoor running enables me to enjoy peaceful time alone and beautiful view along the road,it help me calm down and keep quiet.

Thirdly,outdoor running makes me learn how to obtain my goal bu working hard and how to motivate myself when things get touch.

All in all,outdoor running is my life,I will keep running as long as I can run.

That‘s all,thank you!

谢谢老师的提问，我最喜欢的运动是户外跑步。我通常晚上跑步。说实话我非常喜欢户外跑步，其原因如下。
首先，它可以帮助我减轻所有的压力。无论我有多沮丧，我都能在跑步的那一刻感到放松。第二，户外跑步让我能够独自享受宁静的时光和沿途美丽的风景，它帮助我冷静下来，保持安静。第三，户外跑步让我学会了如何通过努力实现目标，以及如何在事情发生时激励自己。
总之，户外跑步是我的生活，只要我能跑，我就会一直跑。谢谢，我的回答完毕了。

## 18，你从你的科研经历/竞赛经历中学到了什么?（What have you learned from your research experience / competition experience?）

Thanks for your question!

I did my first research project in my sophomore year. It was a team project and I had to cooperate with 4 other students. We encountered several problems during the process. At one point, I almost gave up. Thankfully, with my determination and the help from others, I successfully finished the project. I’ve learned two things from this research experience: firstly, never give up, even in the most difficult situation; secondly, seek others’ help when facing obstacles and always be ready to help others when they are in need.

That‘s all,thank you!

我在大二的时候做了我的第一个研究课题。这是一个团队项目，我与其他 4 名同学合作完成。在研究过程中我们遇到了一些问题。有一次，我几乎放弃了，好在我自己下定了决心， 而且有其他同学的帮助，我最终才成功地完成了这个项目。从那次研究经历中，我学到了两件事：第一，即使在最困难的情况下也不要放弃；第二，在遇到困难时寻求他人的帮助，并随时准备在他人需要时帮助他们。



## 关于毕业设计

> 研究动机或意义 | 研究方法 | 研究内容 | 创新点与技术难点

1.题目+背景

我的毕业论文题目是《基于网络模型的图像修复系统设计》。图像在现代社会诸多领域都有很大的作用，如医学成像、遥感成像。然而,在实际的图像数据捕获过程中,由于受到环境、硬件设备、传输介质等多方面的影响,获取的图像信息无法达到实际的应用需求，因此我选择了图像超分变率作为研究课题, 来提高图像的分辨率并丰富图像的纹理细节。

2.研究内容

论文的核心内容是网络结构和系统设计。



**1、为什么选择我们学校?**

如果老师问到这个问题，

首先可从“硬实力”和“软实力”两方面分析，比如，学校所在城市，机会多、环境优美，较强的专业实力、师资力量或浓厚的学术氛围。

其次，也可以从个人的角度，比如考入某某院校是自己梦寐以求的，希望自己能拜于导师门下，潜心研究，增长更多本领。千万不能脱口而出原来的专业太难了，这个专业很好就业，毕业容易等等

> 提醒:不要贬低自己的本科院校;如果是调剂的话，也不要表现出自己来到调剂的学校很委屈的样子。

**2、你读研之后的规划是什么样的?**

> 针对这个问题，回答的重点要放在如何去做如何实践，如何执行，而不是高谈阔论，夸夸其谈。

可以从实验准备、实践以及日常生活安排等方面展开。比如，学业上取得什么样的进步实践和动手能力获得什么样的成长，学术方面要怎么做等等。对自己未来有一个什么样的展望等等。

**3、你为什么会想要跨专业?**

> 这不仅是一个专业问题，更是在考验同学们的情商。

对于跨专业的同学来说，建议可以从个人兴趣、志向或理想展开，也就是要展现出你对跨专业的热爱，对所报考的专业和学校有深刻的认识。

再引申到即使跨专业你也是有能力的，更多地突显你报这个专业的优势是什么，强调自己的专业所学对读研专业的帮助。

比如，数学专业跨专业考企业管理、国际商务、金融硕士等，可以突显自己收集和分析数据的能力、严谨的逻辑思维能力以及利用数学模型处理实际问题的能力等。

**4、近期读了哪些书/期刊?**

> 这类问题是导师经常会问到的，出现的概率是非常大的

答案可以是报考学校自己定的参考书目，也可以是影响自己深刻的书籍或著作，总之可以体现自己的人生观、价值观以及积极正向的能量就好。

**5、考研过程中遇到过什么问题?**

老师想听你遇到的问题，更想听你是如何处理这个问题的!可以举一个小例子，制造一个小矛盾，然后说自己的处理办法，并得出自己对这个经历的思考。比如:上课时间和学生会工作冲突等等。

**6、你的缺点是什么?**

> 不要直接说自己的缺点，尤其是脾气大、爱偷懒、效率低这类缺点，没有老师会喜欢这样的学生也不要自作聪明地说自己的缺点就是追求完、美。

可以说一些无伤大雅的小毛病，老师主要是想通过回答看出你发现问题和处理问题的能力。说完缺点之后还要说说自己是如何克服缺点的。

例如:我存在的问题就是有时候可能会急于求成，所以今后还是时常提醒自己要静下心来，把学业任务完成好。一定要加上自己改正的决心和方法。

**7、你的兴趣爱好是什么?**

考官问这个问题也是想对你进一步了解，依据兴趣爱好对你的性格做出一定判断，回答正能量积极向上的爱好即可。当然可以加点看书的内容，这样老师也会觉得这是一个爱学的孩子。

**8、你的毕业论文做的什么内容?**

这个问题一定要提前做足功课。对于毕业论文你必须在面试前整理好逻辑思路，在面试时不慌不忙地给导师解释清楚，并且能回答导师随时提出来的问题才可以。

本专业考研的同学对于毕业论文这一环节务必准备充分，跨专业的考生一般导师不会太为难你。

**9、未来几年有什么规划?**

> 这个问题一定要仔细地准备一下，这是很多导师喜欢问到的问题。

主要从你原来的一个状况出发，说一下自己在研究生期间的学生生活打算怎么做，学业上有一个什么样的成就，可以具体说出学业上的论文发表，所看书籍等等，甚至是能达到一个什么样的效果与前程。对自己未来有一个什么样的展望，具体自己达到一个什么样的目标与目的。

总体来说还是根据自己情况出发谈生活、谈未来，具体怎么做是关键。

> 千万不要问到人生规划就说自己完全没想过!

**10、如果你没通过考试怎么办?**

千万不要被这个问题所吓倒，有一部分学生可能会被导师的这个问题所吓到，认为导师是想淘汰他。但是导师之所以提问这个问题并不是因为想要淘汰你，而是想测试一下你的抗压能力。

你的回答可以表示自己会坦然面对，并反思一下自己的不足，不论是准备二战还是准备工作就诚实回答即可。

**11、怎样证明你能比别人做得好?**

> 关于“自我发挥”的这种问题，你千万不要中了老师的圈套。

很多同学明明只是在本科的时候去实验室打打杂，结果就开始空谈虚吹甚至将挂名的论文拿出来显摆。

还有很多同学自以为手里的很多证书都很有用，于是准备了一大口袋!在这个时候，大家一定要把握尺度和火候，因为老师们什么大奖没见过。

简要说明一下拿得出手的奖项和科研经历，然后给你的对手一个台阶:老师，我觉得每个人都有各自的特长，没有人可以比另一个人各个方面都领先等等。