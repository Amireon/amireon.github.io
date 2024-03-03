

假设我们将n[l]的值存储在名为layers的数组中，如下所示：layer_dims = [n_x,4,3,2,1]。 因此，第1层有四个隐藏单元，第2层有三个隐藏单元，依此类推。 您可以使用哪个for循环初始化模型参数？

```python
for i in range(1, len(layer_dims)):
    parameters['W' + str(i)] = np.random.randn(layers[i], layers[i - 1]) * 0.01
    parameters['b' + str(i)] = np.random.randn(layers[i], 1) * 0.01
```



