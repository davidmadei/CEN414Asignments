sentence = ["I am a boy", "I am a girl", "I am a man", "I am a woman"]
count_sentence = 0
len_array = 0
for item in sentence:
    len_array += 1
    item = item.replace("","")
    for i in item:
#         print(i)
        count_sentence += 1
    print(count_sentence)
    print(len_array)