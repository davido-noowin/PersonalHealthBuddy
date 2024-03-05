food_score_arr = [5,2,3,4,5]
title = ['fruits', 'vegetables', 'protein', 'grain', 'dairy']
rec = f'Eat more {title[food_score_arr.index(min(food_score_arr))]}!'

print(rec)