import shutil

output_filename = '../lambda/my_lambda_function'
dir_name = '../lambda/'

shutil.make_archive(output_filename, 'zip', dir_name)