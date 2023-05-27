#include<stdio.h>
 
int main() {
 
   float a, b, c, d, e, s, avg;
 
   scanf("%f%f%f%f%f", &a, &b, &c, &d, &e);
 
   s = a + b + c + d + e;
 
   avg = s / 5;
 
   printf("\nThe Average is :%f", avg);
 
   return 0;
}