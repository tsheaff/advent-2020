# Python 3.6
from functools import reduce
def chinese_remainder(n, a):
    sum = 0
    prod = reduce(lambda a, b: a*b, n)
    for n_i, a_i in zip(n, a):
        p = prod // n_i
        print("a_i is", a_i)
        print("mul_inv is", mul_inv(p, n_i))
        print("p is", p)
        sum += a_i * mul_inv(p, n_i) * p
        print("sum so far is", sum)
    print("sum", sum)
    print("prod", prod)
    return sum % prod
 
 
 
def mul_inv(a, b):
    # print("mul_inv", a, b)
    b0 = b
    x0, x1 = 0, 1
    if b == 1: return 1
    while a > 1:
        q = a // b
        a, b = b, a%b
        x0, x1 = x1 - q * x0, x0
    if x1 < 0: x1 += b0
    # print("  answer is", x1)
    return x1
 
 

#  ns [1789,37,47,1889]
# as [1789,36,45,1886]

# ns [41,37,541,23,13,17,29,983,19]
# as [41,2,500,20,11,10,17,911,4]
 
if __name__ == '__main__':
    n = [41,37,541,23,13,17,29,983,19]
    a = [41,2,500,20,11,10,17,911,4]
    print(chinese_remainder(n, a))