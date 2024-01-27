from io import StringIO
from contextlib import redirect_stdout
from firebase_utils import get_chat_exec_msgs, send_compiled_output


OUTPUT_FORMAT = """Output:\n-------------\n{0}"""

def execute_python_command(command):
    try:
        f = StringIO()
        with redirect_stdout(f):
            exec(command)
        return f.getvalue()
    except Exception as e:
        return str(e)
    
def convert_new_line():
    pass

def compile_user_commands(uid:str, chat_title_id:str):
    exec_msgs = get_chat_exec_msgs(uid, chat_title_id)
    if exec_msgs:
        command = "\n".join(exec_msgs)
        output = execute_python_command(command)
        output = OUTPUT_FORMAT.format(output)
        print(output)
        send_compiled_output(uid, chat_title_id, output)
        return True
    return False
        
if __name__ == "__main__":
    print(compile_user_commands("xFJxMXnhwFSWlF9RCMukcOeM0w23", "05a9ecff-93e0-404a-830e-980fe2733e47"))
    
