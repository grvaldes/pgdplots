function [] = writeKWeb(KsepEv)

Upgd = KsepEv;
num  = size(Upgd,1);

fileID = fopen('Ksep.js', 'w');
fprintf(fileID,'Ksep = [[[');

for i = 1:num

    [Krow,Kcol,Kval] = find(Upgd{i,1});
    
    fprintf(fileID,'%d,',  Krow(1:end-1)-1);
    fprintf(fileID,'%d],[',Krow(end)-1);
    fprintf(fileID,'%d,',  Kcol(1:end-1)-1);
    fprintf(fileID,'%d],[',Kcol(end)-1);
    fprintf(fileID,'%f,',  Kval(1:end-1));
    fprintf(fileID,'%f]',Kval(end));
    
    if i ~= num
        fprintf(fileID,'],[[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'tk = [[');

for i = 1:num   
    
    for j = 1:length(Upgd{i,2})
        if j ~= length(Upgd{i,2})
            fprintf(fileID,'%f,',Upgd{i,2}(1,j));
        else
            fprintf(fileID,'%f',Upgd{i,2}(1,j));
        end
    end
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'ak = [[');

for i = 1:num   
    
    for j = 1:length(Upgd{i,3})
        if j ~= length(Upgd{i,3})
            fprintf(fileID,'%f,',Upgd{i,3}(1,j));
        else
            fprintf(fileID,'%f',Upgd{i,3}(1,j));
        end
    end
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fprintf(fileID,'alk = [[');

for i = 1:num   
    
    for j = 1:length(Upgd{i,4})
        if j ~= length(Upgd{i,4})
            fprintf(fileID,'%f,',Upgd{i,4}(1,j));
        else
            fprintf(fileID,'%f',Upgd{i,4}(1,j));
        end
    end
    
    if i ~= num
        fprintf(fileID,'],[');
    end
end

fprintf(fileID,']];\n\n');
fclose(fileID);