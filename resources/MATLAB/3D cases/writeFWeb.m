function [] = writeFWeb(Upgd,cas)

num  = size(Upgd{1,1},2);

fileID = fopen(['f' cas '.js'], 'w');
fprintf(fileID,'u%s = [[',cas);

for i = 1:num
       
    cach = reshape(Upgd{1,1}(:,i),6,[])';
    
    for j = 1:length(cach)
        if j == 1
            fprintf(fileID,'[%f, %f, %f, %f, %f, %f],',cach(1,:));
        elseif j == length(cach)
            fprintf(fileID,'[%f, %f, %f, %f, %f, %f]',cach(end,:));
        else
            fprintf(fileID,'[%f, %f, %f, %f, %f, %f],',cach(j,:));
        end
    end
    
    if i ~= size(Upgd{1,1},2)
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'b%s = [[',cas);

for i = 1:num   
    
    fprintf(fileID,'%f,',Upgd{1,2}(1:end-1,i));
    fprintf(fileID,'%f',Upgd{1,2}(end,i));
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'a%s = [[',cas);

for i = 1:num    

    fprintf(fileID,'%f,',Upgd{1,3}(1:end-1,i));
    fprintf(fileID,'%f',Upgd{1,3}(end,i));
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'al%s = [[',cas);

for i = 1:num    

    fprintf(fileID,'%f,',Upgd{1,4}(1:end-1,i));
    fprintf(fileID,'%f',Upgd{1,4}(end,i));
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'phi%s = [[',cas);

for i = 1:num    

    fprintf(fileID,'%f,',Upgd{1,5}(1:end-1,i));
    fprintf(fileID,'%f',Upgd{1,5}(end,i));
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'t%s = [[',cas);

for i = 1:num    

    fprintf(fileID,'%f,',Upgd{1,6}(1:end-1,i));
    fprintf(fileID,'%f',Upgd{1,6}(end,i));
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'nu%s = [[',cas);

for i = 1:num    

    fprintf(fileID,'%f,',Upgd{1,7}(1:end-1,i));
    fprintf(fileID,'%f',Upgd{1,7}(end,i));
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'c%s = [',cas);

for i = 1:num    

    if i ~= num
        fprintf(fileID,'%f,',Upgd{1,8}(i));
    else
        fprintf(fileID,'%f',Upgd{1,8}(i));
    end
end

fprintf(fileID,'];\n\n');

fclose(fileID);