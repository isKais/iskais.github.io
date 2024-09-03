[TOC]

## SQLite 命令

与关系数据库进行交互的标准 SQLite 命令类似于 SQL。命令包括 CREATE、SELECT、INSERT、UPDATE、DELETE 和 DROP。这些命令基于它们的操作性质可分为以下几种：

### DDL - 数据定义语言

| 命令   | 描述                                                   |
| ------ | ------------------------------------------------------ |
| CREATE | 创建一个新的表，一个表的视图，或者数据库中的其他对象。 |
| ALTER  | 修改数据库中的某个已有的数据库对象，比如一个表。       |
| DROP   | 删除整个表，或者表的视图，或者数据库中的其他对象。     |

### DML - 数据操作语言

| 命令   | 描述           |
| ------ | -------------- |
| INSERT | 创建一条记录。 |
| UPDATE | 修改记录。     |
| DELETE | 删除记录。     |

### DQL - 数据查询语言

| 命令   | 描述                           |
| ------ | ------------------------------ |
| SELECT | 从一个或多个表中检索某些记录。 |

#### Delete 语句

SQLite 的 **DELETE** 查询用于删除表中已有的记录。可以使用带有 WHERE 子句的 DELETE 查询来删除选定行，否则所有的记录都会被删除。

##### 语法

带有 WHERE 子句的 DELETE 查询的基本语法如下：

```
DELETE FROM table_name
WHERE [condition];
```

您可以使用 AND 或 OR 运算符来结合 N 个数量的条件。

##### 实例

假设 COMPANY 表有以下记录：

```
ID          NAME        AGE         ADDRESS     SALARY
----------  ----------  ----------  ----------  ----------
1           Paul        32          California  20000.0
2           Allen       25          Texas       15000.0
3           Teddy       23          Norway      20000.0
4           Mark        25          Rich-Mond   65000.0
5           David       27          Texas       85000.0
6           Kim         22          South-Hall  45000.0
7           James       24          Houston     10000.0
```

下面是一个实例，它会删除 ID 为 7 的客户：

```
sqlite> DELETE FROM COMPANY WHERE ID = 7;
```

现在，COMPANY 表有以下记录：

```
ID          NAME        AGE         ADDRESS     SALARY
----------  ----------  ----------  ----------  ----------
1           Paul        32          California  20000.0
2           Allen       25          Texas       15000.0
3           Teddy       23          Norway      20000.0
4           Mark        25          Rich-Mond   65000.0
5           David       27          Texas       85000.0
6           Kim         22          South-Hall  45000.0
```

如果您想要从 COMPANY 表中删除所有记录，则不需要使用 WHERE 子句，DELETE 查询如下：

```
sqlite> DELETE FROM COMPANY;
```

现在，COMPANY 表中没有任何的记录，因为所有的记录已经通过 DELETE 语句删除。

## 格式化输出

您可以使用下列的点命令来格式化输出为本教程下面所列出的格式：

```
sqlite>.header on
sqlite>.mode column
sqlite>.timer on
sqlite>
```

## sqlite_master 表格

主表中保存数据库表的关键信息，并把它命名为 **sqlite_master**。如要查看表概要，可按如下操作：

```
sqlite>.schema sqlite_master
```















```sqlite
ATTACH DATABASE file_name AS database_name;
```

```sqlite
CREATE TABLE database_name.table_name(
   column1 datatype  PRIMARY KEY(one or more columns),
   column2 datatype,
   column3 datatype,
   .....
   columnN datatype,
);
```

```
DROP TABLE database_name.table_name;
```

`.show`